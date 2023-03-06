package com.stackhawk.selenium

import io.github.bonigarcia.wdm.managers.ChromeDriverManager
import io.github.bonigarcia.wdm.managers.FirefoxDriverManager
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.openqa.selenium.By
import org.openqa.selenium.Proxy
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import org.openqa.selenium.firefox.FirefoxProfile
import java.util.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TestBrowser {

    private lateinit var browser: WebDriver

    object PropertiesReader {
        private val properties = Properties()

        init {
            val file = this::class.java.classLoader.getResourceAsStream("config.properties")
            properties.load(file)
        }

        fun getProperty(key: String): String = properties.getProperty(key)
    }

    companion object {
        fun getBrowser(browserName: String?): WebDriver {
            val driver: WebDriver = if (browserName != null && browserName == "chrome") {
                val options = ChromeOptions()
                options.setHeadless(HEADLESS)
                HTTP_PROXY?.let { proxyUrl ->
                    val proxy = Proxy()
                    proxy.httpProxy = proxyUrl
                    options.setProxy(proxy)
                }
                ChromeDriverManager.getInstance().setup()
                ChromeDriver(options)
            } else {
                val options = FirefoxOptions()
                options.setHeadless(HEADLESS)

                HTTP_PROXY?.let { proxyUrl ->
                    val profile = FirefoxProfile()
                    // The proxy will always be listening on localhost:<port> so firefox needs this preference set
                    profile.setPreference("network.proxy.allow_hijacking_localhost", true)
                    options.profile = profile
                    val proxy = Proxy()
                    // Firefox wants the http/s proxies in host:port format
                    val firefoxProxy = proxyUrl.replace("http://", "")
                    proxy.httpProxy = firefoxProxy
                    proxy.sslProxy = firefoxProxy
                    options.setProxy(proxy)
                }
                FirefoxDriverManager.getInstance().setup()
                FirefoxDriver(options)
            }
            return driver
        }

        private val LOGIN_USERNAME = PropertiesReader.getProperty("LOGIN_USERNAME")
        private val TOKEN_NAME = PropertiesReader.getProperty("TOKEN_NAME")
        private val TOKEN_VALUE = PropertiesReader.getProperty("TOKEN_VALUE")
        private val LOGIN_PASSWORD = PropertiesReader.getProperty("LOGIN_PASSWORD")
        private val URL = PropertiesReader.getProperty("APP_TEST_HOST")

        // Get the proxy URL as added by hawkscan to the runtime environment
        private val HTTP_PROXY: String? = System.getenv("HTTP_PROXY")
        private val HEADLESS: Boolean = System.getenv("HEADLESS")?.let { it.toBoolean() } ?: true
    }

    @BeforeAll
    fun setUp() {
        // Uncomment to debug if env vars are being passed to the test correctly.
        /*System.getenv().forEach { (key, value) ->
            println("$key=$value")
        }*/
        browser = getBrowser("firefox")
    }

    @AfterAll
    fun destroy() {
        println("Shutting down browser")
        Thread.sleep(2000)
        browser.quit()
    }

    @Test
    fun `can login with formAuth`() {
        formAuth(browser)
        val element = browser.findElement(By.xpath("//button[text()=\"Sign Out\"]"))
        Assertions.assertTrue(element.isDisplayed)
        Assertions.assertTrue(element.isEnabled)
    }

    @Test
    fun `can login with tokenAuth`() {
        tokenAuth(browser)
        Thread.sleep(2000)
        attemptSearch(browser, value = "test")
        val resultsPane = browser.findElement(By.id("results")).getAttribute("class")
        Assertions.assertEquals(resultsPane, "alert-success")
    }

    @Test
    fun `can login with basicAuth`() {
        basicAuth(browser)
        attemptSearch(browser, value = "test")
        val resultsPane = browser.findElement(By.id("results")).getAttribute("class")
        Assertions.assertEquals(resultsPane, "alert-success")
    }

    @Test
    fun `can login with formMultiAuth`() {
        formMultiAuth(browser)
        val element = browser.currentUrl
        browser.navigate().to(element + "search")
        val search = browser.findElement(By.id("search"))
        Assertions.assertTrue(search.isDisplayed)
        Assertions.assertTrue(search.isEnabled)
    }

    @Test
    fun `can visit hidden page`() {
        browser.navigate().to("$URL/hidden/selenium")
        val element = browser.title
        Assertions.assertTrue(element.contains("selenium tests"))
    }

    @Test
    fun `can visit payloads page`() {
        browser.navigate().to(URL)
        val element = browser.currentUrl
        formAuth(browser)
        browser.navigate().to("${element}payloads")
        val urls = browser.findElements(By.tagName("a"))
            .filter { it.getAttribute("href").startsWith("${element}payload") }
            .map { it.getAttribute("href") }
        Assertions.assertTrue(urls.size > 5)
        urls.forEach { url ->
            browser.navigate().to(url)
            Assertions.assertTrue(browser.pageSource.isNotEmpty())
        }
    }

    private fun attemptSearch(browser: WebDriver, value: String) {
        val searchButton = browser.findElement(By.id("items"))
        val searchField = browser.findElement(By.id("search"))
        if (value.isNotEmpty() && searchField.isEnabled) {
            searchField.sendKeys(value)
            searchButton.click()
        }
    }

    private fun signOut(browser: WebDriver) {
        val logoutButton = browser.findElement(By.id("logout"))
        if (logoutButton.isEnabled && logoutButton.isDisplayed) {
            logoutButton.click()
        }
    }

    private fun basicAuth(browser: WebDriver) {
        browser.navigate().to("$URL/basic-auth")
        var element = browser.findElement(By.id("username"))
        element.sendKeys(Companion.LOGIN_USERNAME)
        element = browser.findElement(By.id("password"))
        element.sendKeys(Companion.LOGIN_PASSWORD)
    }

    private fun tokenAuth(browser: WebDriver) {
        browser.navigate().to("$URL/token-auth")
        var element = browser.findElement(By.id("token-name"))
        element.sendKeys(Companion.TOKEN_NAME)
        element = browser.findElement(By.id("token-value"))
        element.sendKeys(Companion.TOKEN_VALUE)
    }

    private fun formAuth(browser: WebDriver) {
        browser.navigate().to("$URL/login")
        var element = browser.findElement(By.id("username"))
        element.sendKeys(Companion.LOGIN_USERNAME)
        element = browser.findElement(By.id("password"))
        element.sendKeys(Companion.LOGIN_PASSWORD)
        element = browser.findElement(By.xpath("//button[text()=\"Submit\"]"))
        element.click()
    }

    private fun formMultiAuth(browser: WebDriver) {
        browser.navigate().to("$URL/login-form-multi")
        var element = browser.findElement(By.id("username"))
        element.sendKeys(Companion.LOGIN_USERNAME)
        element = browser.findElement(By.id("password"))
        element.sendKeys(Companion.LOGIN_PASSWORD)
        element = browser.findElement(By.id("remember"))
        element.click()
        element = browser.findElement(By.xpath("//button[text()=\"Submit\"]"))
        element.click()
    }

    private fun jwtAuth(browser: WebDriver) {
        browser.navigate().to("$URL/jwt-auth")
        var element = browser.findElement(By.xpath("//button[@data-toggle='modal']"))
        element.click()
        element = browser.findElement(By.id("username"))
        element.sendKeys(LOGIN_USERNAME)
        element = browser.findElement(By.id("password"))
        element.sendKeys(LOGIN_PASSWORD)
        element = browser.findElement(By.xpath("//button[text()=\"Log In\"]"))
        element.click()
        element = browser.findElement(By.id("login-message"))
        Assertions.assertEquals(element.text, "\"200 success\"")
        element = browser.findElement(By.xpath("//button[text()=\"Close\"]"))
        element.click()
    }
}

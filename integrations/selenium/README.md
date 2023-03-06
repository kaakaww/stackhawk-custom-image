## [Selenium](https://www.selenium.dev)

![Selenium](../images/selenium-banner.png)

Selenium is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers.

It provides extensions to emulate user interaction with browsers, a distribution server for scaling browser allocation, and the infrastructure for implementations of the W3C WebDriver specification that lets you write interchangeable code for all major web browsers.

Follow the [Selenium Documentation for more information](https://www.selenium.dev/documentation/).

### Running the selenium tests

The selenium tests require the test target application [javaspringvulny](https://github.com/kaakaww/javaspringvulny) to be running locally. 
If you have not already, clone the project and **ensure javaspringvulny web application is running on `https://localhost:9000`**. 
If you're running  [javaspringvulny](https://github.com/kaakaww/javaspringvulny) on  a different port modify the `APP_TEST_HOST` 
in the [config.properties](src/test/resources/config.properties) file.

This project only contains one test class [TestBrowser.kt](src/test/kotlin/com/stackhawk/selenium/TestBrowser.kt). 
You can run the selenium tests from the command line using gradle, which is included in this project.

```shell
./gradlew :test --tests "com.stackhawk.selenium.TestBrowser"
```

### Scanning with HawkScan

To use Selenium as your custom scan discovery process with HawkScan you'll need to modify the 
[WebDriver](https://www.selenium.dev/documentation/webdriver/) options used by selenium to drive the web browser.
When HawkScan is configured to execute the selenium tests it will add the environment variable `HTTP_PROXY`, which will
contain the url needed to configure the WebDriver's proxy options.

The [TestBrowser.kt](src/test/kotlin/com/stackhawk/selenium/TestBrowser.kt#L37) contains the selenium tests 
with a helper function to create the [WebDriver](https://www.selenium.dev/documentation/webdriver/) configured using  
the HawkScan proxy information. 

```kt
// Get the proxy URL as added by hawkscan to the runtime environment
private val HTTP_PROXY: String? = System.getenv("HTTP_PROXY")

fun getBrowser(browserName: String?): WebDriver {
    val driver: WebDriver = if (browserName != null && browserName == "chrome") {
        val options = ChromeOptions()
        options.setHeadless(HEADLESS)

        // Set the proxy information if HTTP_PROXY is not null
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

        // Set the proxy information if HTTP_PROXY is not null
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
```

With the HawkScan proxy information properly configured into the selenium tests you're ready to configure HawkScan 
with the command to execute those tests. What this command is depends on your selenium usage, language, and build 
tool. This project uses gradle so the command we're using is to execute the selenium tests is gradle `:test` task 
with a filter for just running the [TestBrowser.kt](src/test/kotlin/com/stackhawk/selenium/TestBrowser.kt) containing
 the selnium test code.

```yml
  hawk:
  spider:
    maxDurationMinutes: 5
    base: false
    custom:
      command: ./gradlew :test --tests "com.stackhawk.selenium.TestBrowser"
      logOutputToForeground: true
```

You can use the sample [selenium-stackhawk.yml](https://github.com/stackhawk/stackhawk-custom-image/blob/main/integrations/selenium/selenium-stackhawk.yml) file for an example of scanning a web application with it.

### Selenium Best Practices

No one approach works for all situations.

Please refer to the selenium [Test Pratices](https://www.selenium.dev/documentation/test_practices/) for more information

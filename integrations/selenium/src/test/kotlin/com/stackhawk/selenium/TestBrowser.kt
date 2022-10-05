package com.stackhawk.selenium
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

class TestBrowser {
    companion object {
        fun getBrowser(browserName: String?): WebDriver? {
            val driver: WebDriver
            if (browserName != null && browserName == "chrome") {
                ChromeDriverManager.getInstance().setup()
                driver = ChromeDriver()
            } else {
                FirefoxDriverManager.getInstance().setup()
                driver = FirefoxDriver()
            }
            return driver
        }
    }
}
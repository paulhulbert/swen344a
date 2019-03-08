package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class StockTicker {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testStockTicker() throws Exception {
    driver.get("https://web-engineering-spring-2019.firebaseapp.com/");
    driver.findElement(By.linkText("Stocks")).click();
    driver.findElement(By.linkText("MSFT")).click();
    driver.findElement(By.linkText("AAPL")).click();
    driver.findElement(By.linkText("SNAP")).click();
    driver.findElement(By.linkText("TSLA")).click();
    driver.findElement(By.linkText("GOOG")).click();
    driver.findElement(By.linkText("5 Day")).click();
    driver.findElement(By.linkText("1 Month")).click();
    driver.findElement(By.linkText("6 Months")).click();
    driver.findElement(By.linkText("YTD")).click();
    driver.findElement(By.linkText("1 Year")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}

package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class Login {
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
  public void testLogin() throws Exception {
    driver.get("https://web-engineering-spring-2019.firebaseapp.com/");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Please log in with Twitter to access SÜT'])[1]/following::button[1]")).click();
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_local | ]]
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
    driver.findElement(By.id("username_or_email")).clear();
    String twitterUsername = config.getString("username");
    driver.findElement(By.id("username_or_email")).sendKeys(twitterUsername);
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_local | ]]
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
    String twitterPassword = config.template.getString("password");
    driver.findElement(By.id("password")).clear();
    driver.findElement(By.id("password")).sendKeys(twitterPassword);
    driver.findElement(By.id("allow")).click();
    driver.close();
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_local | ]]
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

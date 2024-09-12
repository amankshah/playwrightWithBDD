const { test, expect } = require("@playwright/test");

test("screenshot and visual comparision", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  await page.locator("#displayed-text").screenshot({ path: "partialSS.png" }); //Element screenshot
  await page.locator("#hide-textbox").click();

  await page.screenshot({ path: "screenshot.png" }); //FullPage Screenshot 

  //   await expect(page).toHaveScreenshot();
});

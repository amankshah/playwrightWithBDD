const { test, expect } = require("@playwright/test");

test("JavaScript Popup", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#alertbtn").click();
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    console.log("Dialog Message is ", dialog.message());

    await dialog.accept();
  });
});

test("iFrame Handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("[href*='lifetime']:visible").first().click();
  console.log(
    await framesPage.locator(".header-text h2 span").first().textContent()
  );

  console.log(
    await framesPage.locator("[href*='lifetime']:visible").first().textContent()
  );
});

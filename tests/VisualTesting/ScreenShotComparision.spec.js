const { test, expect } = require("@playwright/test");

test("screenshot and visual comparison", async ({ page }) => {
  await page.goto("https://www.google.com/");

  expect(await page.screenshot()).toMatchSnapshot("google.png");
});

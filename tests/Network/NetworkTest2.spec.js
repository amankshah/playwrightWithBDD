const { test, expect, request } = require("@playwright/test");

const ProductToBePurchased = "ZARA COAT 3";
const email = "testtopro@gmail.com";
const password = "Aman@1992";

test("Security test request Intercepting", async ({ page }) => {
  //Login
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();

  await page.locator(".card-body b").first().waitFor();

  const OderHistoryPage = page.locator("[routerlink*='myorders']");
  await OderHistoryPage.first().click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      })
  );

  await page.locator("button:has-text('View')").first().click();

  await expect(page.locator(".blink_me")).toHaveText(
    "You are not authorize to view this order"
  );
});

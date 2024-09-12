const { test, expect } = require("@playwright/test");

test("First Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //   page.route("**/*.css", (route) => {
  //     //#Blocking Css
  //     route.abort();
  //   });

  //   page.route("**/*.{jpg,png,jpeg}", (route) => {
  //     //#Blocking Images to load
  //     route.abort();
  //   });

  await page.on("request", (request) => {
    console.log(`${request.method()} - ${request.url()}`);
  });
  await page.on("response", (response) => {
    console.log(`${response.status()} - ${response.url()}`);
  });

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //LoginPage Practice | Rahul Shetty Academy

  console.log(await page.title());

  //   await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#username").fill("rahulshetty"); //wong fill

  //   await page.locator("#password").fill("learning");
  await page.locator('[type="password"]').fill("learning");

  await page.locator("#signInBtn").click();

  let errorMessage = page.locator("[style*='block']");
  console.log(await errorMessage.textContent());

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //now filling correct informations

  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator('[type="password"]').fill("learning");
  await page.locator("#signInBtn").click();

  await page.pause();
});

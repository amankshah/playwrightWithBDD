const { When, Then, Given } = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");
const POManager = require("../../tests/pageObjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../../Utils/placeOrderTestData.json"))
);

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (string, string2) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await this.page.title());
    await this.page.locator("#username").fill("rahulshetty"); //wong fill
    await this.page.locator('[type="password"]').fill("learning");
    await this.page.locator("#signInBtn").click();
  }
);

Then("Verify Error message is displayed", async function () {
  this.errorMessage = this.page.locator("[style*='block']");
  console.log(await this.errorMessage.textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});

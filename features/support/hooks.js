const { Before, After } = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");
const POManager = require("../../tests/pageObjects/POManager");


Before(async function () {
  this.browser = await chromium.launch(); // Launch the browser
  this.context = await this.browser.newContext(); // Create a new browser context
  this.page = await this.context.newPage(); // Create a new page

  this.poManager = new POManager(this.page);
});

After(async function () {
  console.log("After hook called");

  await this.browser.close();
});

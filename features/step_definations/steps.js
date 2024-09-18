const { When, Then, Given } = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");
const POManager = require("../../tests/pageObjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../../Utils/placeOrderTestData.json"))
);

Given(
  "a login to Ecommerce application with {username} and {password}",
  async function (string, string2) {
    const browser = chromium.launch();
    const context = browser.newContext();
    const page = context.newPage();

    this.poManager = new POManager(page); // this keyword is coming from world constructor of the cucumber world class
    const loginPage = this.poManager.getLoginPage();

    const UserEmail = dataSet.username;
    const UserPassword = dataSet.password;
    const ProductToBePurchased = dataSet.product;

    await loginPage.goTo();
    await loginPage.ValidLogin(UserEmail, UserPassword);
  }
);

When("Add {string} to Cart", async function (string) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(ProductToBePurchased);
  await dashboardPage.clickCartButton();
});

Then("Verify {string} is displayed in the Cart", async function (string) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(ProductToBePurchased);
  await cartPage.Checkout();
});

When("Enter Valid details and place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
});

Then("Verify order is present in the orderHistoryPage", async function () {
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

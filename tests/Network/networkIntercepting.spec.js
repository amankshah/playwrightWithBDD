const { test, expect, request } = require("@playwright/test");
import APIUtils from "../../Utils/APIUtils.js";
let response;

const ProductToBePurchased = "ZARA COAT 3";
const email = "testtopro@gmail.com";
const password = "Aman@1992";
const loginPayLoad = {
  userEmail: email,
  userPassword: password,
};
const FakeOrderPayLoad = { data: [], message: "No Orders" };

const OrderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  response = await apiUtils.createOrder(OrderPayLoad);
});

test("Client App Login test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //Intercepting the API response -> API call -> response->|| FAKE RESPONSE USING (playwright)||->Browser -> Rendering On The Page
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(FakeOrderPayLoad); //sending body with fake response

      route.fulfill({ response, body }); //# fULFILLING THE REQUEST WITH FAKE RESPONSE
    }
  );

  const orderId = response.ordersId;

  const OrderHistoryPage = page.locator("[routerlink*='myorders']");
  await OrderHistoryPage.first().click();

  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  ); //# here we are first waiting for the original response then fulling the fake response

  //Verifying fake data insertion
  const noOrderMessage = await page.locator(".mt-4").textContent();
  console.log(noOrderMessage);

  expect(
    noOrderMessage.includes("You have No Orders to show at this time.")
  ).toBeTruthy();

  //# Commenting out the below code as we need to test no order condition by intercepting the API
});

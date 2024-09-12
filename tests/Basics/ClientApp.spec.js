const { test, expect } = require("@playwright/test");

const loginPageUrl = "https://rahulshettyacademy.com/client";
const loginPracticePageUrl =
  "https://rahulshettyacademy.com/loginpagePractise/";

test("Browser Validation for  Error Login", async ({ page }) => {
  await page.goto(loginPageUrl);
  await page.locator("#userEmail").fill("testtopro@gmail.com");
  await page.locator("#userPassword").fill("Aman@1992");
  await page.locator("#login").click();
  // await page.waitForLoadState("networkidle");---> not working (Deprecated)
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);
});

test("Browser Validation for  Login", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator('[type="password"]');
  const signInBtn = page.locator("#signInBtn");
  const error = page.locator(".alert-danger");

  const documentLink = page.locator("[href*='documents-req']");

  await page.goto(loginPracticePageUrl);
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator('[type="password"]').fill("learning");

  await expect(page.locator(".alert-danger")).toContainText("Incorrect");

  await page.locator(".radiotextsty").getByText("User").click();
  await expect(page.locator(".radiotextsty").getByText("User")).toBeChecked();

  await page.locator("#okayBtn").click();

  await page.locator("select.form-control").selectOption("consult");
  /*
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await page.locator("#terms").uncheck();
  await expect(page.locator("#terms")).not.toBeChecked(); // use of not
  //   console.log(await page.locator("#terms").isChecked());

  expect(await page.locator("#terms").isChecked()).toBeFalsy(); //to check the false state
  //# in the above line action is performed under expect thats why we need to put await under expect
*/
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();
  //#  in the above line action is performed outside expect thats why we need to put await outside expect

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //# here we are checking the attribute of the element

  await page.locator("#signInBtn").click();
});

test("@web Child Window Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const documentLink = page.locator("[href*='documents-req']");

  await page.goto(loginPracticePageUrl);

  /* 
  # as we need to the thing asynchronous as it should run symiuously  we need to use the Promise.all like bellow

  * const newPage = await context.waitForEvent("page"); //listening  any for new page
  # in the above line we have stored the new page in a variable which is opening after the click on documents link

  # as pages can open at any instance so we need to start listening for any new page before clicking on the link
  * await documentLink.click();

  */

  const [newPage] = await Promise.all([
    //# to run both the promises at the same time we have used Promise.all
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  console.log(await newPage.title());
  await newPage.waitForLoadState("networkidle");
  let highlightedText = await newPage.locator(".red").textContent();

  console.log(highlightedText);
  await newPage.close();
  console.log("page.title", await page.title());

  const textArray = highlightedText.split("@");
  const domain = textArray[1].split(" ")[0];
  console.log("domain", domain);

  await userName.fill(domain);
  console.log(await userName.inputValue());
});

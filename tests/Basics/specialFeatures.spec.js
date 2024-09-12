import { test, expect } from "@playwright/test";

test(" Labels", async ({ page }) => {
  // goto login Page url of rahulshettyacademy
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await expect(page.getByLabel("Employed")).toBeChecked();

  //# it is help full on checkboxes and radio buttons where when the user clicks on the
  //# checkbox or radio button label then the input filled are automatically selected
});

test("Get By Placeholder", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByPlaceholder("Password").fill("AMAN@1992");
  await page.getByPlaceholder("Password").press("Enter");
  await expect(page.getByPlaceholder("Password")).toHaveValue("AMAN@1992");
  //# It is helpful to identify the input elements with a placeholder
});
test("Get By Role", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .first()
    .getByRole("button")
    .click();

  console.log(
    await page
      .locator("app-card")
      .filter({ hasText: "Blackberry" })
      .first()
      .locator("h5", { hasText: "$" })
      .textContent()
  );
});

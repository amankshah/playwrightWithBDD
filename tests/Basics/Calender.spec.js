const { test, expect } = require("@playwright/test");
test("@web Calender Handling", async ({ page }) => {
  const MonthNum = "6";
  const Year = "2023";
  const Day = "11";
  const expectedList = [MonthNum, Day, Year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();

  await page.getByText(Year).click();

  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(MonthNum - 1)
    .click();

  await page
    .locator(".react-calendar__month-view__days")
    .getByText(Day)
    .click();

  const inputFilled = page.locator(".react-date-picker__inputGroup input");
  for (let i = 0; i < inputFilled.length; i++) {
    const value = inputFilled[i].getAttribute("value");

    expect(value).toEqual(expectedList[i]);
  }
});

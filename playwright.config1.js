// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  //set maximum timeout
  timeout: 50000,
  //setting time out for expects as 5 seconds
  expect: { timeout: 5000 },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,  //set workeer at 1 to run the test cases in sequence 
  //# By Default playwright run the files under tests folder in parallel.
  //#but the test cases under one file will always run in sequence
  //#to run in parallel set fullyParallel: false
  //#to run in sequence set fullyParallel: true
  //#to run in parallel set fullyParallel: true and set workers: 1
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",

    //   use: {
    //     ...devices["Desktop Chrome"],
    //     browserName: "chromium",
    //     screenshot: "on",
    //     trace: "on",
    //     //using always headed mode
    //     headless: true,
    //   },
    // },
    {
      //#to run this use npx playwright test tests/PageObjectImplementation/ParameterizedPurchaseUsingFixers.spec.js --config playwright.config1.js project=chromium
      name: "chromium2",

      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        screenshot: "on",
        trace: "on",
        ignoreHTTPSErrors: true, //handling non ssl sites error
        permissions: ["geolocation"], // giving permission for geolocation
        //using always headed mode
        headless: false,
        video: "retain-on-failure", //this will record the video

        // viewport: { width: 720, height: 720 },
      },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

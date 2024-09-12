const { test, expect } = require("@playwright/test");
const ExcelJs = require("exceljs");

async function WriteExcel(
  SearchText,
  replaceText,
  Change = { rowChange: 0, colChange: 0 },
  filePath
) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");

  let Output = await readExcel(worksheet, SearchText);

  const cell = worksheet.getCell(
    Output.row + Change.rowChange,
    Output.column + Change.colChange
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, SearchText) {
  let Output = { row: -1, column: -1 };
  await worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, cellNumber) => {
      //Searching Value in the cell and getting  row and column number
      if (cell.value === SearchText) {
        Output.row = rowNumber;
        Output.column = cellNumber;
        console.log("Row: " + rowNumber + " Column: " + cellNumber);
      }
    });
  });
  return Output;
}

let filepath = "C:/Users/sabhyata/Downloads/download.xlsx";
let textSearch = "Mango";
let newPrice = "600";

test("Upload and Download Excel Validation", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromise;
  await WriteExcel(
    textSearch,
    newPrice,
    { rowChange: 0, colChange: 2 },
    filepath
  );
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(filepath);

  //Verifying the updated data in the webpage
  const textLocator = await page.getByText(textSearch);
  const textRow = await page.getByRole("row").filter({ has: textLocator });
  await expect(textRow.locator("#cell-4-undefined")).toContainText(newPrice);
});

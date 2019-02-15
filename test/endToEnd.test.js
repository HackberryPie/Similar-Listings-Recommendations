const puppeteer = require("puppeteer");

const timeout = 5000;

describe(
  "end to end from client side",
  () => {
    let page;
    beforeAll(async () => {
      const browser = await puppeteer.launch();
      page = await browser.newPage();
      const id = 10;
      await page.goto(`http://localhost:3011/homes/${id}/`);
    }, timeout);

    it("should load without error", async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain("SALE");
    });
  },
  timeout
);

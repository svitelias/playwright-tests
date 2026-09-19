const { test: base } = require('@playwright/test');
const { GaragePage } = require('../pages/GaragePage');
const path = require('path');

const authFile = path.join(__dirname, '../.auth/user.json');

exports.test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: authFile,
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await use(garagePage);
    await context.close();
  },
});

exports.expect = base.expect;

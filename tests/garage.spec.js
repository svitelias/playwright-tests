const { test, expect } = require('./fixtures');

test.describe('Garage page', () => {
  test('should display garage page for logged in user', async ({ userGaragePage }) => {
    await expect(userGaragePage.garageTitle).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });
});

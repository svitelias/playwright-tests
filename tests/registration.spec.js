const { test, expect } = require('@playwright/test');

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByText('Registration').click();
  });

  test('positive - register successfully', async ({ page }) => {
    const timestamp = Date.now();
    await page.locator('#signupName').fill('Svitlana');
    await page.locator('#signupLastName').fill('Elias');
    await page.locator('#signupEmail').fill('aqa-svitelias+' + String(timestamp) + '@test.com');
    await page.locator('#signupPassword').fill('Test1234!');
    await page.locator('#signupRepeatPassword').fill('Test1234!');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL(/.*garage/);
  });

  test('Name empty field error', async ({ page }) => {
    await page.locator('#signupName').click();
    await page.locator('#signupLastName').click();
    await expect(page.getByText('Name required')).toBeVisible();
  });

  test('Name invalid data error', async ({ page }) => {
    await page.locator('#signupName').fill('123');
    await page.locator('#signupLastName').click();
    await expect(page.getByText('Name is invalid')).toBeVisible();
  });

  test('Name too short error', async ({ page }) => {
    await page.locator('#signupName').fill('A');
    await page.locator('#signupLastName').click();
    await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  });

  test('Last name empty field error', async ({ page }) => {
    await page.locator('#signupLastName').click();
    await page.locator('#signupName').click();
    await expect(page.getByText('Last name required')).toBeVisible();
  });

  test('Email empty field error', async ({ page }) => {
    await page.locator('#signupEmail').click();
    await page.locator('#signupName').click();
    await expect(page.getByText('Email required')).toBeVisible();
  });

  test('Email invalid data error', async ({ page }) => {
    await page.locator('#signupEmail').fill('invalid-email');
    await page.locator('#signupName').click();
    await expect(page.getByText('Email is incorrect')).toBeVisible();
  });

  test('Password empty field error', async ({ page }) => {
    await page.locator('#signupPassword').click();
    await page.locator('#signupName').click();
    await expect(page.getByText('Password required')).toBeVisible();
  });

  test('Password too short error', async ({ page }) => {
    await page.locator('#signupPassword').fill('short');
    await page.locator('#signupName').click();
    await expect(page.getByText('Password has to be from 8 to 15 characters long')).toBeVisible();
  });

  test('Passwords do not match error', async ({ page }) => {
    await page.locator('#signupPassword').fill('Test1234!');
    await page.locator('#signupRepeatPassword').fill('Different1!');
    await page.locator('#signupName').click();
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('Register button disabled when form empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });
});

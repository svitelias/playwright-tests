const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/RegistrationPage');

test.describe('Registration form (POM)', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.open();
  });

  test('positive - register successfully', async ({ page }) => {
    const timestamp = Date.now();
    await registrationPage.register(
      'Svitlana',
      'Elias',
      'aqa-svitelias+' + timestamp + '@test.com',
      'Test1234!'
    );
    await expect(page).toHaveURL(/.*garage/);
  });

  test('Name empty field error', async ({ page }) => {
    await registrationPage.nameInput.click();
    await registrationPage.lastNameInput.click();
    await expect(registrationPage.nameError).toBeVisible();
  });

  test('Name invalid data error', async ({ page }) => {
    await registrationPage.fillName('123');
    await registrationPage.lastNameInput.click();
    await expect(registrationPage.nameInvalidError).toBeVisible();
  });

  test('Name too short error', async ({ page }) => {
    await registrationPage.fillName('A');
    await registrationPage.lastNameInput.click();
    await expect(registrationPage.nameLengthError).toBeVisible();
  });

  test('Last name empty field error', async ({ page }) => {
    await registrationPage.lastNameInput.click();
    await registrationPage.nameInput.click();
    await expect(registrationPage.lastNameError).toBeVisible();
  });

  test('Last name invalid data error', async ({ page }) => {
    await registrationPage.fillLastName('123');
    await registrationPage.nameInput.click();
    await expect(registrationPage.lastNameInvalidError).toBeVisible();
  });

  test('Email empty field error', async ({ page }) => {
    await registrationPage.emailInput.click();
    await registrationPage.nameInput.click();
    await expect(registrationPage.emailError).toBeVisible();
  });

  test('Email invalid data error', async ({ page }) => {
    await registrationPage.fillEmail('invalid-email');
    await registrationPage.nameInput.click();
    await expect(registrationPage.emailInvalidError).toBeVisible();
  });

  test('Password empty field error', async ({ page }) => {
    await registrationPage.passwordInput.click();
    await registrationPage.nameInput.click();
    await expect(registrationPage.passwordError).toBeVisible();
  });

  test('Password too short error', async ({ page }) => {
    await registrationPage.fillPassword('short');
    await registrationPage.nameInput.click();
    await expect(registrationPage.passwordLengthError).toBeVisible();
  });

  test('Passwords do not match error', async ({ page }) => {
    await registrationPage.fillPassword('Test1234!');
    await registrationPage.fillRepeatPassword('Different1!');
    await registrationPage.nameInput.click();
    await expect(registrationPage.passwordsMismatchError).toBeVisible();
  });

  test('Register button disabled when form empty', async ({ page }) => {
    await expect(registrationPage.registerButton).toBeDisabled();
  });
});

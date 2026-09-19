const { test, expect } = require('@playwright/test');

test.describe('Profile page response mock', () => {
  test('should display mocked user data on profile page', async ({ page }) => {
    await page.route('**/api/users/profile', async (route) => {
      const mockResponse = {
        status: 'ok',
        data: {
          userId: 999,
          photoFilename: 'default-user.png',
          name: 'Mocked',
          lastName: 'User',
        },
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('#signinEmail').fill(process.env.USER_EMAIL);
    await page.locator('#signinPassword').fill(process.env.USER_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/.*garage/);
    await page.goto('/panel/profile');

    await expect(page.getByText('Mocked')).toBeVisible();
    await expect(page.getByText('User')).toBeVisible();
    await page.screenshot({ path: 'mocked-profile.png' });
  });
});

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test_data/user';

test.describe('Login Tests', () => {

  test('TC_001 - Login page should load @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPageIsVisible();
  });

  test('TC_002 - Valid user should be able to login @smoke', async ({ page }) => {
    const standardUser = users.find(u => u.type === 'standard')!;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await page.waitForURL(/inventory/);
  });

  test('TC_003 - Invalid password should show error @negative', async ({ page }) => {
    const standardUser = users.find(u => u.type === 'standard')!;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, 'galat_password');
    await loginPage.verifyErrorMessage('Username and password do not match');
  });

  test('TC_004 - Locked user should not be able to login @negative', async ({ page }) => {
    const lockedUser = users.find(u => u.type === 'locked')!;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(lockedUser.username, lockedUser.password);
    await loginPage.verifyErrorMessage('Sorry, this user has been locked out');
  });

});

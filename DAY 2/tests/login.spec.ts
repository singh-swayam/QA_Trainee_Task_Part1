import { test, expect } from '@playwright/test';
import { users } from '../test_data/user';

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('Login Tests', () => {

  test('TC_001 - Login page should load @smoke', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('TC_002 - Valid user should be able to login @smoke', async ({ page }) => {
    const standardUser = users.find(u => u.type === 'standard')!;
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_003 - Invalid password should show error @negative', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('random_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('TC_004 - Locked user should not be able to login @negative', async ({ page }) => {
    const lockedUser = users.find(u => u.type === 'locked')!;
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(lockedUser.username);
    await page.locator('[data-test="password"]').fill(lockedUser.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });

});
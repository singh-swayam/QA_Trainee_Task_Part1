import { test, expect } from '@playwright/test';
import { users } from '../test_data/user';
import { products } from '../test_data/products';

const BASE_URL = 'https://www.saucedemo.com/';

interface CheckoutDetails {
  firstName: string;
  lastName: string;
  postalCode: string;
}

const validCheckout: CheckoutDetails = {
  firstName: 'Swayam',
  lastName: 'Singh',
  postalCode: '400078'
};

async function proceedToCheckout(page: any): Promise<void> {
  const standardUser = users.find(u => u.type === 'standard')!;
  const product = products[0];

  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill(standardUser.username);
  await page.locator('[data-test="password"]').fill(standardUser.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);

  await page
    .locator('.inventory_item')
    .filter({ hasText: product.name })
    .getByRole('button', { name: 'Add to cart' })
    .click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);
}

test.describe('Checkout Tests', () => {

  test('TC_010 - Checkout with valid details should reach overview page @regression', async ({ page }) => {
    await proceedToCheckout(page);

    await page.locator('[data-test="firstName"]').fill(validCheckout.firstName);
    await page.locator('[data-test="lastName"]').fill(validCheckout.lastName);
    await page.locator('[data-test="postalCode"]').fill(validCheckout.postalCode);
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();
  });

  test('TC_011 - Checkout with missing first name should show validation error @negative', async ({ page }) => {
    await proceedToCheckout(page);

    await page.locator('[data-test="lastName"]').fill(validCheckout.lastName);
    await page.locator('[data-test="postalCode"]').fill(validCheckout.postalCode);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('TC_012 - Checkout with missing postal code should show validation error @negative', async ({ page }) => {
    await proceedToCheckout(page);

    await page.locator('[data-test="firstName"]').fill(validCheckout.firstName);
    await page.locator('[data-test="lastName"]').fill(validCheckout.lastName);
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

});

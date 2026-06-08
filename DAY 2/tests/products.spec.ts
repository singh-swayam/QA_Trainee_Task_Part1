import { test, expect } from '@playwright/test';
import { users } from '../test_data/user';
import { products } from '../test_data/products';

const BASE_URL = 'https://www.saucedemo.com/';

async function loginAsStandardUser(page: any): Promise<void> {
  const standardUser = users.find(u => u.type === 'standard')!;
  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill(standardUser.username);
  await page.locator('[data-test="password"]').fill(standardUser.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);
}

test.describe('Product and Cart Tests', () => {

  test('TC_005 - Product list should be visible after login @smoke', async ({ page }) => {
    await loginAsStandardUser(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC_006 - Add one product to cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const product = products[0];
    await page
      .locator('.inventory_item')
      .filter({ hasText: product.name })
      .getByRole('button', { name: 'Add to cart' })
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('TC_007 - Remove product from cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const product = products[0];

    await page
      .locator('.inventory_item')
      .filter({ hasText: product.name })
      .getByRole('button', { name: 'Add to cart' })
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page
      .locator('.inventory_item')
      .filter({ hasText: product.name })
      .getByRole('button', { name: 'Remove' })
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('TC_008 - Add multiple products to cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);

    for (const product of products) {
      await page
        .locator('.inventory_item')
        .filter({ hasText: product.name })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      String(products.length)
    );
  });

  test('TC_009 - Cart page should show selected products @regression', async ({ page }) => {
    await loginAsStandardUser(page);

    for (const product of products) {
      await page
        .locator('.inventory_item')
        .filter({ hasText: product.name })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);

    for (const product of products) {
      await expect(
        page.locator('[data-test="inventory-item-name"]', { hasText: product.name})
      ).toBeVisible();
    }
  });

});

import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async verifyProductsPageIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.inventoryList.first()).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.inventoryList
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.inventoryList
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
  }
}

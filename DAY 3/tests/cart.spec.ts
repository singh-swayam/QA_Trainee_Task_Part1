import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../test_data/products';
import { loginAsStandardUser } from '../utils/testHelpers';

test.describe('Cart Tests', () => {

  test('TC_008 - Add multiple products to cart @cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);

    for (const product of products) {
      await productsPage.addProductToCart(product.name);
    }

    await productsPage.verifyCartCount(products.length);
  });

  test('TC_009 - Cart page should show selected products @cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);

    for (const product of products) {
      await productsPage.addProductToCart(product.name);
    }

    await productsPage.goToCart();
    const cartPage = new CartPage(page);

    for (const product of products) {
      await cartPage.verifyProductInCart(product.name);
    }
  });

});

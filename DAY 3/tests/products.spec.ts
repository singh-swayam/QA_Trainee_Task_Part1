import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductPage';
import { products } from '../test_data/products';
import { loginAsStandardUser } from '../utils/testHelpers';

test.describe('Product Tests', () => {

  test('TC_005 - Product list should be visible after login @smoke', async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.verifyProductsPageIsVisible();
  });

  test('TC_006 - Add one product to cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].name);
    await productsPage.verifyCartCount(1);
  });

  test('TC_007 - Remove product from cart @regression', async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].name);
    await productsPage.verifyCartCount(1);
    await productsPage.removeProductFromCart(products[0].name);
    await productsPage.verifyCartCount(0);
  });

});

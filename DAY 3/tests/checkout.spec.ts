import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { products } from '../test_data/products';
import { loginAsStandardUser } from '../utils/testHelpers';
import { STANDARD_USER } from '../test_data/user';

test.describe('Checkout Tests', () => {

  async function proceedToCheckoutForm(page: any): Promise<void> {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].name);
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
  }

  test('TC_010 - Checkout with valid details should reach overview page @checkout @regression', async ({ page }) => {
    await proceedToCheckoutForm(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.submitCheckoutForm(STANDARD_USER.firstName!, STANDARD_USER.lastName!, STANDARD_USER.postalCode!);
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderConfirmation();
  });

  test('TC_011 - Checkout with missing first name should show validation error @checkout @negative', async ({ page }) => {
    await proceedToCheckoutForm(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.submitCheckoutForm('', STANDARD_USER.lastName!, STANDARD_USER.postalCode!);
    await checkoutPage.verifyValidationMessage('Error: First Name is required');
  });

  test('TC_012 - Checkout with missing postal code should show validation error @checkout @negative', async ({ page }) => {
    await proceedToCheckoutForm(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.submitCheckoutForm(STANDARD_USER.firstName!, STANDARD_USER.lastName!, '');
    await checkoutPage.verifyValidationMessage('Error: Postal Code is required');
  });

});

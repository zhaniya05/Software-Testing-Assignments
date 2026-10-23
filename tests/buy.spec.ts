import { test } from '../fixtures/pages.fixture';
import { AUTH_FILES } from '../data/seed-users';

test.use({ storageState: AUTH_FILES.customer2 });

test('buys a product and completes checkout', async ({
  productPage,
  cartPage,
  checkoutPage,
  page,
}) => {
  const quantity = 2;
  const product = await productPage.openAnyProduct();

  await productPage.addToCart(quantity);
  await cartPage.open();
  await cartPage.expectItem(product.name, quantity);
  await cartPage.proceedToCheckout();

  console.log('URL after proceed-1:', page.url());
  console.log('Page title:', await page.title());

  await checkoutPage.completeCheckout();
  await checkoutPage.expectOrderConfirmed();
});
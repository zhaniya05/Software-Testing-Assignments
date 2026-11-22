import { test } from '../fixtures/pages.fixture';
import { registerViaApi } from '../data/api';
import { createUser } from '../data/user.factory';

test('buys a product and completes checkout', async ({
  productPage,
  cartPage,
  checkoutPage,
  loginPage,
  page,
}) => {
  // Own account per test: independent of other tests, so safe under --shard.
  const user = createUser();
  await registerViaApi(user);
  await loginPage.signIn(user);
  await loginPage.expectSignedIn();

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
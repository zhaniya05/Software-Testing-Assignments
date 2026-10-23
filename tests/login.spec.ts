import { test } from '../fixtures/pages.fixture';
import { CUSTOMER_2} from '../data/seed-users';

test.describe('Login', () => {
  // Anonymous on purpose: this is the one place UI login is the subject under test.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('valid credentials reach the account page', async ({ loginPage }) => {
    await loginPage.signIn(CUSTOMER_2);
    await loginPage.expectSignedIn();
  });

  test('unregistered credentials show an error and do not reach the account page', async ({
    loginPage,
    newUser,
  }) => {
    await loginPage.signIn(newUser);
    await loginPage.expectLoginRejected();
  });
});
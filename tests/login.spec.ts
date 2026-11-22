import { test } from '../fixtures/pages.fixture';
import { registerViaApi } from '../data/api';
import { createUser } from '../data/user.factory';

test.describe('Login', () => {
  // Anonymous on purpose: this is the one place UI login is the subject under test.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('valid credentials reach the account page', async ({ loginPage }) => {
    const user = createUser();
    await registerViaApi(user);
    await loginPage.signIn(user);
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
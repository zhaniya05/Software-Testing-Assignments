import { test } from '../fixtures/pages.fixture';
import { CUSTOMER_2 } from '../data/seed-users';

test.describe('Reset password', () => {
  test('a known email gets the confirmation', async ({ loginPage }) => {
    await loginPage.requestPasswordReset(CUSTOMER_2.email);
    await loginPage.expectResetConfirmation();
  });

  test('a malformed email shows an error and no confirmation', async ({ loginPage }) => {
    await loginPage.requestPasswordReset('not-an-email');
    await loginPage.expectResetRejected();
  });
});
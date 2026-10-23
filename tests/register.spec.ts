import { test } from '../fixtures/pages.fixture';

test('registers a new customer with a unique account', async ({ registerPage, newUser }) => {
  await registerPage.register(newUser);
  await registerPage.expectRegistered();
});
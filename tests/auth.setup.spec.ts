import { test as setup } from '../fixtures/pages.fixture';
import { AUTH_FILES } from '../data/seed-users';
import { registerViaApi } from '../data/api';
import { createUser } from '../data/user.factory';
import fs from 'node:fs';
import path from 'node:path';

setup('authenticate customer', async ({ loginPage, page }) => {
  const user = createUser();
  await registerViaApi(user);

  await loginPage.signIn(user);
  await loginPage.expectSignedIn();

  fs.mkdirSync(path.dirname(AUTH_FILES.customer), { recursive: true });
  await page.context().storageState({ path: AUTH_FILES.customer });
});

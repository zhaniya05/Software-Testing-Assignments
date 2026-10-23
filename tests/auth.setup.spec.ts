import { test as setup } from '../fixtures/pages.fixture';
import { AUTH_FILES, CUSTOMER, CUSTOMER_2 } from '../data/seed-users';
import fs from 'node:fs';
import path from 'node:path';

const accounts = [
  { name: 'customer', user: CUSTOMER, file: AUTH_FILES.customer },
  { name: 'customer2', user: CUSTOMER_2, file: AUTH_FILES.customer2 },
];

for (const { name, user, file } of accounts) {
  setup(`authenticate ${name}`, async ({ loginPage, page }) => {
    await loginPage.signIn(user);
    await loginPage.expectSignedIn();

    fs.mkdirSync(path.dirname(file), { recursive: true });
    await page.context().storageState({ path: file });
  });
}
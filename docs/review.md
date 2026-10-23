# My changes to the reference suite

I started from the reference suite built in stages (config, data factory, fixture, page objects, five specs) and
adapted it to the real Toolshop application. This is what I changed, what I added, and what is still open.

## What I changed

| Area | Reference | What I did |
|---|---|---|
| Locators | Placeholders (`pending()`) | Filled them from my codegen recording: login (`email`, `password`, `login-submit`, `login-error`, `page-title`), register (all fields, `register-submit`), product (`product-name`, `unit-price`, `quantity`, `add-to-cart`, `cart-quantity`), cart and checkout steps |
| Test data | US sample address, `example.com` emails | Australian address with a house number, `@gmail.com` emails; `houseNumber` added to the user type and the register form |
| Product choice | Any product from the list | Buy test opens a fixed product (Bolt Cutters); products are found by name with an anchored pattern |
| Login test | Valid login with `customer@` | Valid login with `customer2@` |
| Compare test | Placeholder product names | Two real products (Claw Hammer with Shock Reduction Grip, Hammer) and the check that the first costs more than the second |
| Checkout | Billing and payment as separate steps | One `completeCheckout()` that signs in, fills the billing address, picks Buy Now Pay Later with 9 installments and confirms |
| TypeScript config | ESNext module | CommonJS, to match `"type": "commonjs"` in `package.json` |
| Auth setup | `tests/auth.setup.ts` | Kept as `auth.setup.spec.ts`; creates the `playwright/.auth` folder before saving |
| README | Design decisions and limitations | Short setup and run instructions |

## What I added

- A GitHub Actions workflow that runs the Playwright tests on push and pull request.
- A `test()` helper in the base page that selects by `data-test`, used next to `testId()`.
- `changePassword.spec.ts`, containing the reset-password tests, and `example.spec.ts` from the Playwright template.

## What stayed the same

The fixtures file, the data factory (apart from the address and email), the seed users, and the register spec.
The config still has `baseURL`, `testIdAttribute: 'data-test'`, `trace: 'on-first-retry'`, CI-only retries and
a chromium project.

## Known deviations I still need to fix

1. Checkout signs in through the UI (`signInDuringCheckout()`), which breaks the rule to log in through the UI
   only in the login test. It should rely on the saved login state instead.
2. The auth setup is not a Playwright setup project, so nothing guarantees it runs before the buy test.
3. The cart page uses one XPath (`ancestor::tr`).
4. `buy.spec.ts` still has two `console.log` lines for debugging.
5. The forgot-password locators are still placeholders, so the reset-password tests cannot pass yet.
6. Some spec files do not use the required names (`buy-product`, `compare-products`, `reset-password`,
   `auth.setup.ts`), and `example.spec.ts` should be deleted.
7. The compare test title does not match its products, and it checks exact prices that depend on seed data.
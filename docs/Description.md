# Description

## Goal

Build an automated UI test suite for the **Toolshop** demo web shop (https://practicesoftwaretesting.com, an
Angular front end over a REST API) using **Playwright and TypeScript**. The suite covers five core user flows
(one spec file each) and is structured for maintainability: page objects, fixtures, a data factory and a saved
authentication state.

The application is a **shared public instance**, so other people use it at the same time. The suite is therefore
designed to be independent, parallel-safe and free of assertions on global state (for example, the total number
of products).

## Approach

- **Page Object Model.** Page objects expose business actions (`signIn(user)`, `register(user)`,
  `addToCart(quantity)`), not bare element getters. Spec files contain no locators.
- **Fixtures.** Specs import `test` from `fixtures/pages.fixture.ts`; page objects are never constructed by hand.
- **Locators.** Elements are found through the `data-test` attribute (`testIdAttribute: 'data-test'`), using
  `getByTestId` or `getByRole`. No CSS class selectors and no positional XPath.
- **Waiting.** Web-first assertions (`await expect(locator)...`) only. `waitForTimeout` is never used.
- **Test data.** A factory generates a unique user (UUID-based email) per test. Known demo accounts are used
  only where an existing account is required.
- **Authentication.** `auth.setup.ts` logs in once per run and saves `storageState`. Tests that need a signed-in
  user reuse it. Only the login test signs in through the UI as its subject.
- **Configuration.** `baseURL`, `trace: 'on-first-retry'`, retries only in CI, a single `chromium` project.

## Scope

**In scope:** the five test cases below, at UI level.

**Out of scope:** reading reset emails, cross-browser runs, load or performance testing, cleaning up created
accounts and orders, and any assertion on data the test did not create or select.

## Test cases to be automated

| # | Spec file | Test case | Auth state |
|---|-----------|-----------|------------|
| TC1 | `register.spec.ts` | Register a new customer | none |
| TC2 | `login.spec.ts` | Log in with valid and invalid credentials | none |
| TC3 | `buy-product.spec.ts` | Buy a product | `customer` |
| TC4 | `compare-products.spec.ts` | Compare two products | none |
| TC5 | `reset-password.spec.ts` | Reset a password | none |

### TC1. Register a new customer

- **Precondition:** none.
- **Data:** a fresh unique user from the factory.
- **Steps:** open the register page, fill in all required fields, submit.
- **Expected result:** the account is created and the user ends up signed in or on the login page.
- **Open point:** the spec accepts two outcomes. It needs to be confirmed which one the application produces.

### TC2. Log in

Two tests in one spec.

- **TC2.1, valid credentials.** Sign in with the demo customer account. **Expected:** the account page is
  reached and a signed-in-only element is visible.
- **TC2.2, invalid credentials.** Sign in with an unregistered email. **Expected:** an error is shown and the
  account page is not reached.
- **Note:** a registered account with a wrong password is deliberately not used, to avoid locking a shared
  account for other users (to be verified).

### TC3. Buy a product

- **Precondition:** signed in as the demo customer through the saved storage state.
- **Steps:** open a product and capture its name, set a quantity, add it to the cart, open the cart, proceed to
  checkout and complete it.
- **Expected result:** the cart shows the selected item with the chosen quantity, and checkout completes with an
  order confirmation.
- **Open points:** how the product is chosen (fixed name or first in the list), the payment method, and the
  checkout steps. These are not yet decided.

### TC4. Compare two products

- **Precondition:** none. The application has no built-in compare feature, so the comparison is performed by the
  test.
- **Steps:** open two products, capture the name and price of each.
- **Expected result:** the stated comparison holds, for example "product A is cheaper than product B".
- **Open point:** the two product names and the exact comparison are to be chosen.

### TC5. Reset a password

Two tests in one spec. Only the observable UI outcome is in scope.

- **TC5.1, known email.** Request a reset for the second demo account. **Expected:** the confirmation message
  is shown.
- **TC5.2, invalid email.** Request a reset with a malformed address. **Expected:** an error is shown and no
  confirmation appears.
- **Open point:** "invalid" is implemented as malformed. A well-formed but unregistered address may behave
  differently, and this needs a decision.

## Current status

The framework skeleton, configuration, data factory, fixtures, page objects and all five specs are written.
Locators are still placeholders until the real `data-test` values are provided, so the suite has not yet run
against the live site.

## Risks and assumptions

- Routes and some registration field formats are assumptions and are marked in the code.
- The shared demo accounts can be affected by other users.
- Each run leaves a new registered account, and the buy test leaves an order.
- The saved login state only works if the token is stored in cookies or `localStorage`, not `sessionStorage`.
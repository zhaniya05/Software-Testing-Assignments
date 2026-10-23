# Prompt

you are a senior qa automation engineer. help me build a playwright + TypeScript
test suite for a university assignment. act as a reviewer too, for example, if requirement
is ambiguous, say so instead of guessing.
https://practicesoftwaretesting.com -the toolshop. angular front end over a REST
API, shared public instance, so other people use it at the same time as me. accounts: customer@practicesoftwaretesting.com / welcome01 and
customer2@practicesoftwaretesting.com / welcome01.
elements are marked with the `data-test` attribute.
there are five test cases (one spec file each)
1. Register a new customer: a unique account is created and the user ends up
   signed in or on the login page.
2. Log in: valid credentials reach the account page; invalid ones show an error
   and do NOT reach it.
3. Buy a product: add to cart, cart shows the right item and quantity, checkout completes.
4. Compare two products: open two products, capture name and price, assert the
   comparison I state. The app has no built-in compare feature, so this is a
   comparison my test performs (e.g. "product A is cheaper than B").
5. Reset a password: forgot-password gives the expected confirmation for a known
   email and an error for an invalid one. Only the observable UI outcome is in
   scope, since no reset email can be read.

the structure should be:
tests/ register.spec.ts, login.spec.ts, buy-product.spec.ts,
       compare-products.spec.ts, reset-password.spec.ts
pages/ base.page.ts, login.page.ts, register.page.ts, product.page.ts,
       cart.page.ts, checkout.page.ts
fixtures/pages.fixture.ts   (specs import `test` from here, never `new LoginPage(page)`)
data/user.factory.ts        (fresh unique user per run)
playwright.config.ts, README.md

hard rules, violating any of them fails the assignment
- NO locators in spec files. Page objects expose business actions
  (e.g. `signIn(user)`), not bare element getters.
- NO `waitForTimeout`, anywhere. Use web-first assertions instead.
- NO CSS class selectors and NO positional XPath. Prefer getByRole / getByTestId.
- Every test must contain at least one assertion that could really fail.
  Use `await expect(locator)...` assertions. Do not use
  `expect(await x.textContent())` for checks, and never forget `await`.
- Tests must be independent, pass in any order and in parallel. No test may rely
  on another having run.
- Do not assert on global state (e.g. "exactly 9 products"). Assert only on
  data my test created or selected.
- Config: baseURL, testIdAttribute: 'data-test', trace: 'on-first-retry',
  retries only in CI, chromium project.
- Login through the UI only in the login test; other tests that need a signed-in
  user should reuse a saved storageState from an auth.setup.ts (add
  playwright/.auth to .gitignore).
- Unique data (emails) generated per run via the factory.

Do NOT invent data-test values. I will paste the real attribute names / codegen
output for each page. Until I do, use clearly marked placeholders
like `TODO_LOCATOR` and list which ones you need from me.

## How to work
Work in stages and stop after each one for my review:
1. playwright.config.ts + auth.setup.ts + folder skeleton.
2. data factory, base page and fixture.
3. Test 2 (login) fully: page object + spec.
Then ask me before continuing with the other four.
For each stage, explain in 2-3 sentences why you made the key decisions
(I must document them in the README).

and at the end of each stage, self-review your code against the hard rules above
and list any rule you may have broken.
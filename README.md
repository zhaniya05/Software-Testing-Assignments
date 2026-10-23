# Software Testing Assignments

This repository contains assignments and practical work for the Software Testing course.

## Playwright Automation Testing

Automated UI tests for [Practice Software Testing](https://practicesoftwaretesting.com/) using Playwright and TypeScript.

### Technologies

* Playwright
* TypeScript
* Node.js

### Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

### Run tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project Structure

* `tests/` — automated tests
* `pages/` — Page Object Model classes
* `fixtures/` — test fixtures
* `data/` — test data
* `playwright.config.ts` — Playwright configuration

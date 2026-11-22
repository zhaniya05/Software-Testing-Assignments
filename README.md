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

## CI

[![Playwright Tests](https://github.com/zhaniya05/Software-Testing-Assignments/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/zhaniya05/Software-Testing-Assignments/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. It is built into GitHub, where the repository already lives, needs no server of its own, is free for public repositories and supports matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):

- runs on every push and pull request (plus manual `workflow_dispatch`);
- `npm ci` with the npm cache, Chromium installed with system dependencies;
- the full Playwright suite split into 4 shards (`--shard=i/4`) running in parallel;
- the `merge-reports` job merges the shards' blob reports into one HTML report and JUnit;
- artefacts: `playwright-report` (HTML), `test-results-N` (traces, screenshots, videos, JUnit), `junit-report`; kept for 14 days.

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, reporters `list`, `blob`, `junit`, `trace: 'on-first-retry'`.

Tests are independent (each test that needs an account registers its own through the API), so they are safe to split across shards.

### Runtime

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | _TODO_ | _TODO_ | _TODO_ |
| 4 shards + merge | _TODO_ | _TODO_ | _TODO_ |

To fill in from real GitHub Actions runs (median of 3 `workflow_dispatch` runs). Conclusion: _TODO_ (with few fast tests the ~1 min setup per shard can cancel out the gain).

### Running locally

```bash
npm ci
npx playwright install --with-deps chromium
CI=true npx playwright test
```

## Project Structure

* `tests/` — automated tests
* `pages/` — Page Object Model classes
* `fixtures/` — test fixtures
* `data/` — test data
* `playwright.config.ts` — Playwright configuration

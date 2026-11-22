# CI pipeline: AI usage notes

**Model:** Claude (Sonnet 5.5) via Claude Code.

**Prompt (summary):** fix the failing GitHub run, then implement SIS 2 (CI pipeline for Playwright) from the provided guide PDF and list what changed.

**What the AI did**
- Diagnosed failing tests locally: shared demo accounts rejected by the site, forgot-password locators were placeholders.
- Added `.github/workflows/playwright.yml` (4-shard matrix + merge job, npm cache, 14-day artefacts), the `CI` branch in `playwright.config.ts`, `merge.config.ts`, a CI section in the README and `.gitignore` entries.
- Removed the `auth.setup` project: with `--shard` it would run on only one shard, so tests now create their own user via API (`data/api.ts`).

**Reviewed / still manual:** the timing table, run links and badge need real runs on GitHub (feature-branch push, PR, merge to main).

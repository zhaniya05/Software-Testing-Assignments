import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  protected testId(id: string): Locator {
    return this.page.getByTestId(id);
  }

  protected test(id: string): Locator {
    return this.page.locator(`[data-test="${id}"]`);
  }
  /**
   * Stand-in for a locator you have not given me yet. Throws on use, so a
   * missing locator fails immediately with a clear message instead of timing out.
   */
  protected pending(description: string): Locator {
    throw new Error(`Locator not provided yet: ${description}`);
  }

  protected async expectPath(path: RegExp | string): Promise<void> {
    await expect(this.page).toHaveURL(path);
  }
}
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private get cartLink() {
    return this.test('nav-cart');
  }

  private get checkoutButton() {
    return this.test('proceed-1');
  }

  private lineItem(name: string) {
    return this.page.getByText(name, { exact: true });
  }

  private lineQuantity(name: string) {
    return this.lineItem(name)
      .locator('xpath=ancestor::tr')
      .locator('input');
  }

  async open(): Promise<void> {
    await this.cartLink.click();
  }

  async expectItem(name: string, quantity: number): Promise<void> {
    await expect(this.lineItem(name)).toBeVisible();
    await expect(this.lineQuantity(name)).toHaveValue(String(quantity));
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
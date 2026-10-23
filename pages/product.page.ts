import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface ProductInfo {
  name: string;
  price: number;
}
    
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class ProductPage extends BasePage {
    private get productTitle() {
    return this.test('product-name');
    }

    private get unitPrice() {
    return this.test('unit-price');
    }

    private get quantityInput() {
    return this.test('quantity');
    }

    private get addToCartButton() {
    return this.test('add-to-cart');
    }

    private get addedConfirmation() {
    return this.test('cart-quantity');
    }


  private get firstProductCard() {
    return this.testId('product-01M5MYQXHWYVJ7DCX31V8K8MZV');
  }


  async openByName(name: string): Promise<ProductInfo> {
    await this.goto('/');

    await this.page
      .getByRole('link', {
        name: new RegExp(`^${escapeRegExp(name)}\\b`, 'i'),
      })
      .click();

    return this.readDetails();
  }

  async openAnyProduct(): Promise<ProductInfo> {
    await this.goto('/');
    await this.page.getByRole('link', { name: /^Bolt Cutters\b/i }).click();
    return this.readDetails();
  }

  async addToCart(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
    await expect(this.addedConfirmation).toBeVisible();
  }

  private async readDetails(): Promise<ProductInfo> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.unitPrice).toHaveText(/\d/);

    const name = (await this.productTitle.innerText()).trim();
    const price = Number.parseFloat(
      (await this.unitPrice.innerText()).replace(/[^0-9.]/g, '')
    );

    return { name, price };
  }
}
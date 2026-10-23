import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  private get country() {
    return this.test('country');
  }

  private get postalCode() {
    return this.test('postal_code');
  }

  private get houseNumber() {
    return this.test('house_number');
  }

  private get proceedButton() {
    return this.test('proceed-2');
  }

  private get paymentMethod() {
    return this.test('payment-method');
  }

  private get monthlyInstallments() {
    return this.test('monthly_installments');
  }

  private get finishButton() {
    return this.test('finish');
  }

  private get confirmation() {
    return this.page.getByText(/payment was successful|order confirmed|thank you/i);
  }


  private get emailInput() {
    return this.test('email');
  }

  private get passwordInput() {
    return this.test('password');
  }

  private get loginButton() {
    return this.test('login-submit');
  }

  async signInDuringCheckout(): Promise<void> {
    await this.emailInput.fill('customer2@practicesoftwaretesting.com');
    await this.passwordInput.fill('welcome01');
    await this.loginButton.click();
  }

  async expectOrderConfirmed(): Promise<void> {
    await expect(this.confirmation).toBeVisible();
  }


  async completeCheckout(): Promise<void> {
    // Sign in — checkout opens on the sign-in step
    await this.signInDuringCheckout();

    // Billing address
    await this.proceedButton.click();
    await this.houseNumber.fill('12');
    await this.postalCode.fill('2345');
    await this.country.selectOption('AU');
    await this.test('proceed-3').click();

    // Payment
    await this.paymentMethod.selectOption('buy-now-pay-later');
    await this.monthlyInstallments.selectOption('9');
    await this.finishButton.click();
  }



}
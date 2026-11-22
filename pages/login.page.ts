import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { Credentials } from '../data/seed-users';

const LOGIN_PATH = '/auth/login';
const LOGIN_URL = /\/auth\/login/;
const ACCOUNT_URL = /\/account\/?$/;
const FORGOT_PASSWORD_PATH = '/auth/forgot-password'; // ASSUMPTION: confirm


export class LoginPage extends BasePage {

  // inside class LoginPage
  private get resetEmailInput() {
    return this.testId('email');
  }
  private get resetSubmitButton() {
    return this.testId('forgot-password-submit');
  }
  private get resetConfirmation() {
    return this.page.locator('.alert-success');
  }
  private get resetError() {
    return this.testId('email-error');
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.goto(FORGOT_PASSWORD_PATH);
    await this.resetEmailInput.fill(email);
    await this.resetSubmitButton.click();
  }

  async expectResetConfirmation(): Promise<void> {
    await expect(this.resetConfirmation).toBeVisible();
  }

  async expectResetRejected(): Promise<void> {
    await expect(this.resetError).toBeVisible(); // wait for the app to react first
    await expect(this.resetConfirmation).toBeHidden();
  }

  private get emailInput() {
    return this.testId('email');
  }

  private get passwordInput() {
    return this.testId('password');
  }

  private get submitButton() {
    return this.testId('login-submit');
  }

  private get errorMessage() {
    return this.testId('login-error');
  }

  private get accountMarker() {
    return this.testId('page-title');
  }

  async signIn(user: Credentials): Promise<void> {
    await this.goto(LOGIN_PATH);

    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }

  async expectSignedIn(): Promise<void> {
    await this.expectPath(ACCOUNT_URL);
    await expect(this.accountMarker).toBeVisible({ timeout: 15_000 });
  }

  async expectLoginRejected(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await this.expectPath(LOGIN_URL);
  }
}

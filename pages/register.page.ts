import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { NewUser } from '../data/user.factory';

const REGISTER_PATH = '/auth/register';

export class RegisterPage extends BasePage {
  private get firstName() {
    return this.testId('first-name');
  }

  private get lastName() {
    return this.testId('last-name');
  }

  private get dateOfBirth() {
    return this.testId('dob');
  }

  private get houseNumber() {
    return this.testId('house_number')
  }

  private get street() {
    return this.testId('street');
  }

  private get postcode() {
    return this.testId('postal_code');
  }

  private get city() {
    return this.testId('city');
  }

  private get state() {
    return this.testId('state');
  }

  private get country() {
    return this.testId('country');
  }

  private get phone() {
    return this.testId('phone');
  }

  private get email() {
    return this.testId('email');
  }

  private get password() {
    return this.testId('password');
  }

  private get submit() {
    return this.testId('register-submit');
  }

  async register(user: NewUser): Promise<void> {
    await this.goto(REGISTER_PATH);

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dateOfBirth.fill(user.dateOfBirth);
    await this.houseNumber.fill(user.houseNumber);
    await this.street.fill(user.street);
    await this.postcode.fill(user.postcode);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption(user.country);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    await this.submit.click();
  }

  async expectRegistered(): Promise<void> {
    await expect(this.page).toHaveURL(/\/auth\/login|\/account/);
  }
}

import { randomUUID } from 'node:crypto';
import type { Credentials } from './seed-users';

export interface NewUser extends Credentials {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  houseNumber: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

/** Builds a fresh, unique user. Safe under parallel workers: uniqueness comes from a UUID, not a clock. */
export function createUser(overrides: Partial<NewUser> = {}): NewUser {
  const id = randomUUID().replace(/-/g, '').slice(0, 12);
  return {
    firstName: 'QA',
    lastName: `Tester${id}`,
    dateOfBirth: '1990-01-15',
    houseNumber: '12',
    street: '12 Block Turn',
    postcode: '2345',
    city: 'Brandynchester',
    state: 'Victoria',
    country: 'AU',
    phone: '0123456789',
    email: `qa.${id}@gmail.com`,
    password: `Aa1!${id}xY`,
    ...overrides,
  };
}
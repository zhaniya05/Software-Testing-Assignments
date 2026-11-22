import { request } from '@playwright/test';
import type { NewUser } from './user.factory';

const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

/** Creates the account through the API so tests don't depend on shared demo accounts (which can get locked). */
export async function registerViaApi(user: NewUser): Promise<void> {
  const api = await request.newContext({ baseURL: API_URL });
  try {
    const res = await api.post('/users/register', {
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        dob: user.dateOfBirth,
        phone: user.phone,
        email: user.email,
        password: user.password,
        address: {
          street: user.street,
          city: user.city,
          state: user.state,
          country: user.country,
          postal_code: user.postcode,
        },
      },
    });
    if (!res.ok()) throw new Error(`register failed: ${res.status()} ${await res.text()}`);
  } finally {
    await api.dispose();
  }
}

/** Logs in through the API and returns the JWT the front end keeps in localStorage ('auth-token'). */
export async function loginViaApi(user: { email: string; password: string }): Promise<string> {
  const api = await request.newContext({ baseURL: API_URL });
  try {
    const res = await api.post('/users/login', { data: { email: user.email, password: user.password } });
    if (!res.ok()) throw new Error(`login failed: ${res.status()} ${await res.text()}`);
    return (await res.json()).access_token as string;
  } finally {
    await api.dispose();
  }
}

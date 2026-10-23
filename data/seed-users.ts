export interface Credentials {
  email: string;
  password: string;
}

export const CUSTOMER: Credentials = {
  email: 'customer@practicesoftwaretesting.com',
  password: process.env.CUSTOMER_PASSWORD ?? 'welcome01',
};

export const CUSTOMER_2: Credentials = {
  email: 'customer2@practicesoftwaretesting.com',
  password: process.env.CUSTOMER_2_PASSWORD ?? 'welcome01',
};

export const AUTH_FILES = {
  customer: 'playwright/.auth/customer.json',
  customer2: 'playwright/.auth/customer2.json',
} as const;
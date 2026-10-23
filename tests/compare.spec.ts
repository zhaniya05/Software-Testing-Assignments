import { test, expect } from '../fixtures/pages.fixture';

const PRODUCT_A = 'Claw Hammer with Shock Reduction Grip';
const PRODUCT_B = 'Hammer';

test('Combination Pliers is more expensive than Hammer', async ({ productPage }) => {
const a = await productPage.openByName(PRODUCT_A);
const b = await productPage.openByName(PRODUCT_B);

expect(a.price).toBe(13.41);
expect(b.price).toBe(12.58);
expect(a.price).toBeGreaterThan(b.price);
});

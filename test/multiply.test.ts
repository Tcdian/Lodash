import { multiply } from '../source/math/multiply';

test(`multiply(6, 4) => ${multiply(6, 4)}`, () => {
    expect(multiply(6, 4)).toBe(24);
});

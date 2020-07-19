import { floor } from '../source/math/floor';

test(`floor(4.006) => ${floor(4.006)}`, () => {
    expect(floor(4.006)).toBe(4);
});

test(`floor(0.046, 2) => ${floor(0.046, 2)}`, () => {
    expect(floor(0.046, 2)).toBe(0.04);
});

test(`floor(4060, -2) => ${floor(4060, -2)}`, () => {
    expect(floor(4060, -2)).toBe(4000);
});

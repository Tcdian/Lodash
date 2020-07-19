import { ceil } from '../source/math/ceil';

test(`ceil(4.006) => ${ceil(4.006)}`, () => {
    expect(ceil(4.006)).toBe(5);
});

test(`ceil(6.004, 2) => ${ceil(6.004, 2)}`, () => {
    expect(ceil(6.004, 2)).toBe(6.01);
});

test(`ceil(6040, -2) => ${ceil(6040, -2)}`, () => {
    expect(ceil(6040, -2)).toBe(6100);
});

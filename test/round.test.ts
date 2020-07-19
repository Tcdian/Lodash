import { round } from '../source/math/round';

test(`round(4.006) => ${round(4.006)}`, () => {
    expect(round(4.006)).toBe(4);
});

test(`round(4.006, 2) => ${round(4.006, 2)}`, () => {
    expect(round(4.006, 2)).toBe(4.01);
});

test(`round(4060, -2) => ${round(4060, -2)}`, () => {
    expect(round(4060, -2)).toBe(4100);
});

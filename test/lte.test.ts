import { lte } from '../source/lang/lte';

test(`lte(1, 3) => ${lte(1, 3)}`, () => {
    expect(lte(1, 3)).toBe(true);
});

test(`lte(3, 3) => ${lte(3, 3)}`, () => {
    expect(lte(3, 3)).toBe(true);
});

test(`lte(3, 1) => ${lte(3, 1)}`, () => {
    expect(lte(3, 1)).toBe(false);
});

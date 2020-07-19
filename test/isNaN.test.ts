import { isNaN } from '../source/lang/isNaN';

test(`isNaN(NaN) => ${isNaN(NaN)}`, () => {
    expect(isNaN(NaN)).toBe(true);
});

test(`isNaN(new Number(NaN)) => ${isNaN(new Number(NaN))}`, () => {
    expect(isNaN(new Number(NaN))).toBe(true);
});

test(`isNaN(undefined) => ${isNaN(undefined)}`, () => {
    expect(isNaN(undefined)).toBe(false);
});

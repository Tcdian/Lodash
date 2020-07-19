import { isInteger } from '../source/lang/isInteger';

test(`isInteger(3) => ${isInteger(3)}`, () => {
    expect(isInteger(3)).toBe(true);
});

test(`isInteger(Number.MIN_VALUE) => ${isInteger(Number.MIN_VALUE)}`, () => {
    expect(isInteger(Number.MIN_VALUE)).toBe(false);
});

test(`isInteger(Infinity) => ${isInteger(Infinity)}`, () => {
    expect(isInteger(Infinity)).toBe(false);
});

test(`isInteger('3') => ${isInteger('3')}`, () => {
    expect(isInteger('3')).toBe(false);
});

import { isNumber } from '../source/lang/isNumber';

test(`isNumber(3) => ${isNumber(3)}`, () => {
    expect(isNumber(3)).toBe(true);
});

test(`isNumber(Number.MIN_VALUE) =>${isNumber(Number.MIN_VALUE)}`, () => {
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
});

test(`isNumber(Infinity) => ${isNumber(Infinity)}`, () => {
    expect(isNumber(Infinity)).toBe(true);
});

test(`isNumber('3') => ${isNumber('3')}`, () => {
    expect(isNumber('3')).toBe(false);
});

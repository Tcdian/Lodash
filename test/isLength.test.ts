import { isLength } from '../source/lang/isLength';

test(`isLength(3) => ${isLength(3)}`, () => {
    expect(isLength(3)).toBe(true);
});

test(`isLength(Number.MIN_VALUE) => ${isLength(Number.MIN_VALUE)}`, () => {
    expect(isLength(Number.MIN_VALUE)).toBe(false);
});

test(`isLength(Infinity) => ${isLength(Infinity)}`, () => {
    expect(isLength(Infinity)).toBe(false);
});

test(`isLength('3') => ${isLength('3')}`, () => {
    expect(isLength('3')).toBe(false);
});

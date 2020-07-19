import { isFinite } from '../source/lang/isFinite';

test(`isFinite(3) => ${isFinite(3)}`, () => {
    expect(isFinite(3)).toBe(true);
});

test(`isFinite(Number.MIN_VALUE) => ${isFinite(Number.MIN_VALUE)}`, () => {
    expect(isFinite(Number.MIN_VALUE)).toBe(true);
});

test(`isFinite(Infinity) => ${isFinite(Infinity)}`, () => {
    expect(isFinite(Infinity)).toBe(false);
});

test(`isFinite('3') => ${isFinite('3')}`, () => {
    expect(isFinite('3')).toBe(false);
});

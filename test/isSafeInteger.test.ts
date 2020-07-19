import { isSafeInteger } from '../source/lang/isSafeInteger';

test(`isSafeInteger(3) => ${isSafeInteger(3)}`, () => {
    expect(isSafeInteger(3)).toBe(true);
});

test(`isSafeInteger(Number.MIN_VALUE) => ${isSafeInteger(Number.MIN_VALUE)}`, () => {
    expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);
});

test(`isSafeInteger(Infinity) => ${isSafeInteger(Infinity)}`, () => {
    expect(isSafeInteger(Infinity)).toBe(false);
});

test(`isSafeInteger('3') => ${isSafeInteger('3')}`, () => {
    expect(isSafeInteger('3')).toBe(false);
});

import { isSafeInteger } from '../source/lang/isSafeInteger';

describe('isSafeInteger', () => {
    test('isSafeInteger(3) => true', () => {
        expect(isSafeInteger(3)).toBe(true);
    });

    test('isSafeInteger(Number.MIN_VALUE) => false', () => {
        expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);
    });

    test('isSafeInteger(Infinity) => false', () => {
        expect(isSafeInteger(Infinity)).toBe(false);
    });

    test('isSafeInteger("3") => false', () => {
        expect(isSafeInteger('3')).toBe(false);
    });
});

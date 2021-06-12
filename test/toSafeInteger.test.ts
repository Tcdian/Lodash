import { toSafeInteger } from '../source/lang/toSafeInteger';

describe('toSafeInteger', () => {
    test('toSafeInteger(3.2) => 3', () => {
        expect(toSafeInteger(3.2)).toBe(3);
    });

    test('toSafeInteger(Number.MIN_VALUE) => 0', () => {
        expect(toSafeInteger(Number.MIN_VALUE)).toBe(0);
    });

    test('toSafeInteger(Infinity) => 9007199254740991', () => {
        expect(toSafeInteger(Infinity)).toBe(9007199254740991);
    });

    test('toSafeInteger("3.2") => 3', () => {
        expect(toSafeInteger('3.2')).toBe(3);
    });
});

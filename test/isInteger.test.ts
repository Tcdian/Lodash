import { isInteger } from '../source/lang/isInteger';

describe('isInteger', () => {
    test('isInteger(3) => true', () => {
        expect(isInteger(3)).toBe(true);
    });

    test('isInteger(Number.MIN_VALUE) => false', () => {
        expect(isInteger(Number.MIN_VALUE)).toBe(false);
    });

    test('isInteger(Infinity) => false', () => {
        expect(isInteger(Infinity)).toBe(false);
    });

    test('isInteger("3") => false', () => {
        expect(isInteger('3')).toBe(false);
    });
});

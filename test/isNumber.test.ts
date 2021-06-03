import { isNumber } from '../source/lang/isNumber';

describe('isNumber', () => {
    test('isNumber(3) => true', () => {
        expect(isNumber(3)).toBe(true);
    });

    test('isNumber(Number.MIN_VALUE) => true', () => {
        expect(isNumber(Number.MIN_VALUE)).toBe(true);
    });

    test('isNumber(Infinity) => true', () => {
        expect(isNumber(Infinity)).toBe(true);
    });

    test('isNumber("3") => false', () => {
        expect(isNumber('3')).toBe(false);
    });
});

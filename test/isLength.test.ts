import { isLength } from '../source/lang/isLength';

describe('isLength', () => {
    test('isLength(3) => true', () => {
        expect(isLength(3)).toBe(true);
    });

    test('isLength(Number.MIN_VALUE) => false', () => {
        expect(isLength(Number.MIN_VALUE)).toBe(false);
    });

    test('isLength(Infinity) => false', () => {
        expect(isLength(Infinity)).toBe(false);
    });

    test('isLength("3") => false', () => {
        expect(isLength('3')).toBe(false);
    });
});

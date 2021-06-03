import { isNaN } from '../source/lang/isNaN';

describe('isNaN', () => {
    test('isNaN(NaN) => true', () => {
        expect(isNaN(NaN)).toBe(true);
    });

    test('isNaN(new Number(NaN)) => true', () => {
        expect(isNaN(new Number(NaN))).toBe(true);
    });

    test('isNaN(undefined) => false', () => {
        expect(isNaN(undefined)).toBe(false);
    });
});

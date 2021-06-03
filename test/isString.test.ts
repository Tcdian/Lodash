import { isString } from '../source/lang/isString';

describe('isString', () => {
    test('isString("abc") => true', () => {
        expect(isString('abc')).toBe(true);
    });

    test('isString(1) => false', () => {
        expect(isString(1)).toBe(false);
    });
});

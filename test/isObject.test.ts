import { isObject } from '../source/lang/isObject';

describe('isObject', () => {
    test('isObject({}) => true', () => {
        expect(isObject({})).toBe(true);
    });

    test('isObject([1, 2, 3]) => true', () => {
        expect(isObject([1, 2, 3])).toBe(true);
    });

    test('isObject(null) => false', () => {
        expect(isObject(null)).toBe(false);
    });
});

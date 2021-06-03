import { isArray } from '../source/lang/isArray';

describe('isArray', () => {
    test('isArray([1, 2, 3]) => true', () => {
        expect(isArray([1, 2, 3])).toBe(true);
    });

    test('isArray("abc") => false', () => {
        expect(isArray('abc')).toBe(false);
    });
});

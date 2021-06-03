import { isArrayLike } from '../source/lang/isArrayLike';

describe('isArrayLike', () => {
    test('isArrayLike([1, 2, 3]) => true', () => {
        expect(isArrayLike([1, 2, 3])).toBe(true);
    });

    test('isArrayLike("abc") => true', () => {
        expect(isArrayLike('abc')).toBe(true);
    });
});

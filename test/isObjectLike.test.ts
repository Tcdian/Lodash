import { isObjectLike } from '../source/lang/isObjectLike';

describe('isObjectLike', () => {
    test('isObjectLike({}) => true', () => {
        expect(isObjectLike({})).toBe(true);
    });

    test('isObjectLike([1, 2, 3]) => true', () => {
        expect(isObjectLike([1, 2, 3])).toBe(true);
    });

    test('isObjectLike(null) => false', () => {
        expect(isObjectLike(null)).toBe(false);
    });
});

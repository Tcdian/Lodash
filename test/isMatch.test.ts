import { isMatch } from '../source/lang/isMatch';

describe('isMatch', () => {
    test('isMatch({ a: 1, b: 2 }, { b: 2 }) => true', () => {
        expect(isMatch({ a: 1, b: 2 }, { b: 2 })).toBe(true);
    });

    test('isMatch({ a: 1, b: 2 }, { b: 1 }) => false', () => {
        expect(isMatch({ a: 1, b: 2 }, { b: 1 })).toBe(false);
    });

    test('isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }) => false', () => {
        expect(isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
    });
});

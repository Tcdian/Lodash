import { isEmpty } from '../source/lang/isEmpty';

describe('isEmpty', () => {
    test('isEmpty(null) => true', () => {
        expect(isEmpty(null)).toBe(true);
    });

    test('isEmpty(true) => true', () => {
        expect(isEmpty(true)).toBe(true);
    });

    test('isEmpty(1) => true', () => {
        expect(isEmpty(1)).toBe(true);
    });

    test('isEmpty([1, 2, 3]) => false', () => {
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('isEmpty({ a: 1 }) => false', () => {
        expect(isEmpty({ a: 1 })).toBe(false);
    });
});

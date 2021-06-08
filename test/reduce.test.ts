import { reduce } from '../source/collection/reduce';

describe('reduce', () => {
    test('reduce array', () => {
        expect(reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    });

    test('reduce object', () => {
        expect(
            reduce(
                { a: 1, b: 2, c: 1 },
                (result: Record<string, string[]>, value, key) => {
                    (result[value] || (result[value] = [])).push(key);
                    return result;
                },
                {}
            )
        ).toEqual({ '1': ['a', 'c'], '2': ['b'] });
    });
});

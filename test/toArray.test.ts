import { toArray } from '../source/lang/toArray';

describe('toArray', () => {
    test('toArray({ a: 1, b: 2 }) => [1, 2]', () => {
        expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    });

    test('toArray("abc") => ["a", "b", "c"]', () => {
        expect(toArray('abc')).toEqual(['a', 'b', 'c']);
    });

    test('toArray(1) => []', () => {
        expect(toArray(1)).toEqual([]);
    });

    test('toArray(null) => []', () => {
        expect(toArray(null)).toEqual([]);
    });
});

import { entries } from '../source/object/entries';
import { create } from '../source/object/create';

describe('entries', () => {
    test('entries(create({ a: 1 }, { b: 2 })) => [["b", 2]]', () => {
        expect(entries(create({ a: 1 }, { b: 2 }))).toEqual([['b', 2]]);
    });

    test('entries(new Set([1, 2])) => [[1, 1], [2, 2]]', () => {
        expect(entries(new Set([1, 2]))).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    test('entries(new Map([["a", 1]])) => [["a", 1]]', () => {
        expect(entries(new Map([['a', 1]]))).toEqual([['a', 1]]);
    });
});

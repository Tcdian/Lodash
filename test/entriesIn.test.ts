import { entriesIn } from '../source/object/entriesIn';
import { create } from '../source/object/create';

describe('entriesIn', () => {
    test('entriesIn(create({ a: 1 }, { b: 2 })) => [["b", 2], ["a", 1]]', () => {
        expect(entriesIn(create({ a: 1 }, { b: 2 }))).toEqual([
            ['b', 2],
            ['a', 1],
        ]);
    });

    test('entriesIn(new Set([1, 2])) => [[1, 1], [2, 2]]', () => {
        expect(entriesIn(new Set([1, 2]))).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    test('entriesIn(new Map([["a", 1]])) => ["a", 1]', () => {
        expect(entriesIn(new Map([['a', 1]]))).toEqual([['a', 1]]);
    });
});

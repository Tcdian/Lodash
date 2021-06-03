import { chunk } from '../source/array/chunk';

describe('chunk', () => {
    test('chunk(["a", "b", "c", "d"], 2) => [["a", "b"], ["c", "d"]]', () => {
        expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
            ['a', 'b'],
            ['c', 'd'],
        ]);
    });

    test('chunk(["a", "b", "c", "d"], 3) => [["a", "b", "c"], ["d"]]', () => {
        expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
    });
});

import { flattenDepth } from '../source/array/flattenDepth';

describe('flattenDepth', () => {
    test('flattenDepth([1, [2, [3, [4]], 5]], 1) => [1, 2, [3, [4]], 5]', () => {
        expect(flattenDepth([1, [2, [3, [4]], 5]], 1)).toEqual([1, 2, [3, [4]], 5]);
    });

    test('flattenDepth([1, [2, [3, [4]], 5]], 2) => [1, 2, 3, [4], 5]', () => {
        expect(flattenDepth([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
    });
});

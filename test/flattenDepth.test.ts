import { flattenDepth } from '../source/array/flattenDepth';

test(`flattenDepth([1, [2, [3, [4]], 5]], 1) => ${flattenDepth([1, [2, [3, [4]], 5]], 1)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 1)).toEqual([1, 2, [3, [4]], 5]);
});

test(`flattenDepth([1, [2, [3, [4]], 5]], 2) => ${flattenDepth([1, [2, [3, [4]], 5]], 2)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
});

import _ from 'lodash';
import flattenDepth from '../source/flattenDepth';

test(`flattenDepth([1, [2, [3, [4]], 5]], 1) => ${_.flattenDepth([1, [2, [3, [4]], 5]], 1)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 1)).toEqual(_.flattenDepth([1, [2, [3, [4]], 5]], 1));
});

test(`flattenDepth([1, [2, [3, [4]], 5]], 2) => ${_.flattenDepth([1, [2, [3, [4]], 5]], 2)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 2)).toEqual(_.flattenDepth([1, [2, [3, [4]], 5]], 2));
});

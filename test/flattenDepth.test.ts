import _ from 'lodash';
import { flattenDepth } from '../source/array';

test(`flattenDepth([1, [2, [3, [4]], 5]], 1) => ${flattenDepth([1, [2, [3, [4]], 5]], 1)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 1)).toEqual(_.flattenDepth([1, [2, [3, [4]], 5]], 1));
});

test(`flattenDepth([1, [2, [3, [4]], 5]], 2) => ${flattenDepth([1, [2, [3, [4]], 5]], 2)}`, () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 2)).toEqual(_.flattenDepth([1, [2, [3, [4]], 5]], 2));
});

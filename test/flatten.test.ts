import { flatten } from '../source/array/flatten';

test(`flatten([1, [2, [3, [4]], 5]]) => ${flatten([1, [2, [3, [4]], 5]])}`, () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
});

import { concat } from '../source/array/concat';

test(`concat([1], 2, [3], [[4]]) => ${concat([1], 2, [3], [[4]])}`, () => {
    expect(concat([1], 2, [3], [[4]])).toEqual([1, 2, 3, [4]]);
});

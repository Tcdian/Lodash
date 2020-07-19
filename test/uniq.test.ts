import { uniq } from '../source/array/uniq';

test(`uniq([2, 1, 2]) => ${uniq([2, 1, 2])}`, () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1]);
});

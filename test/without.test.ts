import { without } from '../source/array/without';

test(`without([2, 1, 2, 3], 1, 2) => ${without([2, 1, 2, 3], 1, 2)}`, () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
});

import { slice } from '../source/array/slice';

test(`slice([1, 2, 3], 1) => ${slice([1, 2, 3], 1)}`, () => {
    expect(slice([1, 2, 3], 1)).toEqual([2, 3]);
});

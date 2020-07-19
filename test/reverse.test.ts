import { reverse } from '../source/array/reverse';

const arr = [1, 2, 3];

test(`reverse([1, 2, 3]) => ${reverse([1, 2, 3])}`, () => {
    expect(reverse(arr)).toEqual([3, 2, 1]);
    expect(arr).toEqual([3, 2, 1]);
});

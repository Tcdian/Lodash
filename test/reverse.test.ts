import _ from 'lodash';
import { reverse } from '../source/array/reverse';

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

test(`reverse([1, 2, 3]) => ${reverse([1, 2, 3])}`, () => {
    expect(reverse(arr1)).toEqual(_.reverse(arr2));
    expect(arr1).toEqual(arr2);
});

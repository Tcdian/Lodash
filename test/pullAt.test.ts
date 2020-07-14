import _ from 'lodash';
import { pullAt } from '../source/array/pullAt';

const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = ['a', 'b', 'c', 'd'];

test(`pullAt(['a', 'b', 'c', 'd'], [1, 3]) => ${pullAt(['a', 'b', 'c', 'd'], [1, 3])}`, () => {
    expect(_.pullAt(arr1, [1, 3])).toEqual(pullAt(arr2, [1, 3]));
    expect(arr1).toEqual(arr2);
});

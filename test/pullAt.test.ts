import { pullAt } from '../source/array/pullAt';

const arr = ['a', 'b', 'c', 'd'];

test(`pullAt(['a', 'b', 'c', 'd'], [1, 3]) => ${pullAt(['a', 'b', 'c', 'd'], [1, 3])}`, () => {
    expect(pullAt(arr, [1, 3])).toEqual(['b', 'd']);
    expect(arr).toEqual(['a', 'c']);
});

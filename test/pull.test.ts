import _ from 'lodash';
import pull from '../source/pull';

let arr1: string[];
let arr2: string[];
beforeEach(() => {
    arr1 = ['a', 'b', 'c', 'b', 'c'];
    arr2 = ['a', 'b', 'c', 'b', 'c'];
});

test(`pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a') => ${pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a')}`, () => {
    _.pull(arr1, 'a');
    pull(arr2, 'a');
    expect(arr1).toEqual(arr2);
});

test(`pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c') => ${pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c')}`, () => {
    _.pull(arr1, 'a', 'c');
    pull(arr2, 'a', 'c');
    expect(arr1).toEqual(arr2);
});

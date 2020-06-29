import _ from 'lodash';
import { pullAll } from '../source/array';

let arr1: string[];
let arr2: string[];
beforeEach(() => {
    arr1 = ['a', 'b', 'c', 'b', 'c'];
    arr2 = ['a', 'b', 'c', 'b', 'c'];
});

test(`pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a']) => ${pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a'])}`, () => {
    _.pullAll(arr1, ['a']);
    pullAll(arr2, ['a']);
    expect(arr1).toEqual(arr2);
});

test(`pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']) => ${pullAll(
    ['a', 'b', 'c', 'a', 'b', 'c'],
    ['a', 'c']
)}`, () => {
    _.pullAll(arr1, ['a', 'c']);
    pullAll(arr2, ['a', 'c']);
    expect(arr1).toEqual(arr2);
});

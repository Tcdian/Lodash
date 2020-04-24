import _ from 'lodash';
import pullAll from '../source/pullAll';

let arr1: string[];
let arr2: string[];
beforeEach(() => {
    arr1 = ['a', 'b', 'c', 'b', 'c'];
    arr2 = ['a', 'b', 'c', 'b', 'c'];
});

test("pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a']) => ['b', 'c', 'b', 'c']", () => {
    _.pullAll(arr1, ['a']);
    pullAll(arr2, ['a']);
    expect(arr1).toEqual(arr2);
});

test("pullAll(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c') => ['b', 'b']", () => {
    _.pullAll(arr1, ['a', 'c']);
    pullAll(arr2, ['a', 'c']);
    expect(arr1).toEqual(arr2);
});

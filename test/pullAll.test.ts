import { pullAll } from '../source/array/pullAll';

let arr: string[];

beforeEach(() => {
    arr = ['a', 'b', 'c', 'b', 'c'];
});

test(`pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a']) => ${pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a'])}`, () => {
    pullAll(arr, ['a']);
    expect(arr).toEqual(['b', 'c', 'b', 'c']);
});

test(`pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']) => ${pullAll(
    ['a', 'b', 'c', 'a', 'b', 'c'],
    ['a', 'c']
)}`, () => {
    pullAll(arr, ['a', 'c']);
    expect(arr).toEqual(['b', 'b']);
});

import { pull } from '../source/array/pull';

let arr: string[];
beforeEach(() => {
    arr = ['a', 'b', 'c', 'b', 'c'];
});

test(`pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a') => ${pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a')}`, () => {
    pull(arr, 'a');
    expect(arr).toEqual(['b', 'c', 'b', 'c']);
});

test(`pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c') => ${pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c')}`, () => {
    pull(arr, 'a', 'c');
    expect(arr).toEqual(['b', 'b']);
});

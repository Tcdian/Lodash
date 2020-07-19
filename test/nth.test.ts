import { nth } from '../source/array/nth';

const array = ['a', 'b', 'c', 'd'];

test(`nth(['a', 'b', 'c', 'd'], 1) => ${nth(array, 1)}`, () => {
    expect(nth(array, 1)).toEqual('b');
});

test(`nth(['a', 'b', 'c', 'd'], -2) => ${nth(array, -2)}`, () => {
    expect(nth(array, -2)).toEqual('c');
});

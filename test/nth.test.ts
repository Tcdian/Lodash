import _ from 'lodash';
import { nth } from '../source/array';

const array = ['a', 'b', 'c', 'd'];

test(`nth(['a', 'b', 'c', 'd'], 1) => ${nth(array, 1)}`, () => {
    expect(nth(array, 1)).toEqual(_.nth(array, 1));
});

test(`nth(['a', 'b', 'c', 'd'], -2) => ${nth(array, -2)}`, () => {
    expect(nth(array, -2)).toEqual(_.nth(array, -2));
});

import _ from 'lodash';
import nth from '../source/nth';

const array = ['a', 'b', 'c', 'd'];

test(`nth(['a', 'b', 'c', 'd'], 1) => ${nth(array, 1)}`, () => {
    expect(nth(array, 1)).toEqual(_.nth(array, 1));
});

test(`nth(['a', 'b', 'c', 'd'], -2) => ${_.nth(array, -2)}`, () => {
    expect(nth(array, -2)).toEqual(_.nth(array, -2));
});

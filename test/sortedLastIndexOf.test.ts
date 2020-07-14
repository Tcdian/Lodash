import _ from 'lodash';
import { sortedLastIndexOf } from '../source/array/sortedLastIndexOf';

test(`sortedLastIndexOf([4, 5, 5, 5, 8], 5) => ${sortedLastIndexOf([4, 5, 5, 5, 8], 5)}`, () => {
    expect(sortedLastIndexOf([4, 5, 5, 5, 8], 5)).toBe(_.sortedLastIndexOf([4, 5, 5, 5, 8], 5));
});

test(`sortedLastIndexOf([4, 5, 5, 5, 8], 1) => ${sortedLastIndexOf([4, 5, 5, 5, 8], 1)}`, () => {
    expect(sortedLastIndexOf([4, 5, 5, 5, 8], 1)).toBe(_.sortedLastIndexOf([4, 5, 5, 5, 8], 1));
});

test(`sortedLastIndexOf([4, 5, 5, 5, 8], 9) => ${sortedLastIndexOf([4, 5, 5, 5, 8], 9)}`, () => {
    expect(sortedLastIndexOf([4, 5, 5, 5, 8], 9)).toBe(_.sortedLastIndexOf([4, 5, 5, 5, 8], 9));
});

test(`sortedLastIndexOf([4, 5, 5, 5, 8], 6) => ${sortedLastIndexOf([4, 5, 5, 5, 8], 6)}`, () => {
    expect(sortedLastIndexOf([4, 5, 5, 5, 8], 6)).toBe(_.sortedLastIndexOf([4, 5, 5, 5, 8], 6));
});

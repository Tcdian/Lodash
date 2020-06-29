import _ from 'lodash';
import { sortedIndexOf } from '../source/array';

test(`sortedIndexOf([4, 5, 5, 5, 8], 5) => ${sortedIndexOf([4, 5, 5, 5, 8], 5)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 5)).toBe(_.sortedIndexOf([4, 5, 5, 5, 8], 5));
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 1) => ${sortedIndexOf([4, 5, 5, 5, 8], 1)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 1)).toBe(_.sortedIndexOf([4, 5, 5, 5, 8], 1));
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 9) => ${sortedIndexOf([4, 5, 5, 5, 8], 9)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 9)).toBe(_.sortedIndexOf([4, 5, 5, 5, 8], 9));
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 6) => ${sortedIndexOf([4, 5, 5, 5, 8], 6)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 6)).toBe(_.sortedIndexOf([4, 5, 5, 5, 8], 6));
});

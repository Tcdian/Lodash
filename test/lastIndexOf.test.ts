import _ from 'lodash';
import lastIndexOf from '../source/lastIndexOf';

test(`lastIndexOf([1, 2, 1, 2], 2) => ${lastIndexOf([1, 2, 1, 2], 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(_.lastIndexOf([1, 2, 1, 2], 2));
});

test(`lastIndexOf([1, 2, 1, 2], 2, 2) => ${lastIndexOf([1, 2, 1, 2], 2, 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(_.lastIndexOf([1, 2, 1, 2], 2, 2));
});

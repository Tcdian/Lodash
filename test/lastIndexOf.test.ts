import _ from 'lodash';
import lastIndexOf from '../source/lastIndexof';

test(`lastIndexOf([1, 2, 1, 2], 2) => ${_.lastIndexOf([1, 2, 1, 2], 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(_.lastIndexOf([1, 2, 1, 2], 2));
});

test(`lastIndexOf([1, 2, 1, 2], 2, 2) => ${_.lastIndexOf([1, 2, 1, 2], 2, 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(_.lastIndexOf([1, 2, 1, 2], 2, 2));
});

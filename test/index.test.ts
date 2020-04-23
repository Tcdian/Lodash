import _ from 'lodash';
import indexOf from '../source/indexOf';

test(`indexOf([1, 2, 1, 2], 2) => ${_.indexOf([1, 2, 1, 2], 2)}`, () => {
    expect(indexOf([1, 2, 1, 2], 2)).toEqual(_.indexOf([1, 2, 1, 2], 2));
});

test(`indexOf([1, 2, 1, 2], 2, 2) => ${_.indexOf([1, 2, 1, 2], 2, 2)}`, () => {
    expect(indexOf([1, 2, 1, 2], 2, 2)).toEqual(_.indexOf([1, 2, 1, 2], 2, 2));
});
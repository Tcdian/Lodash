import _ from 'lodash';
import fill from '../source/fill';

test(`fill([1, 2, 3], 5) => ${fill([1, 2, 3], 5)}`, () => {
    expect(fill([1, 2, 3], 5)).toEqual(_.fill([1, 2, 3], 5));
});

test(`fill(Array(3), 2) => ${fill(Array(3), 2)}`, () => {
    expect(fill(Array(3), 2)).toEqual(_.fill(Array(3), 2));
});

test(`fill([4, 6, 8, 10], 0, 1, 3) => ${fill([4, 6, 8, 10], 0, 1, 3)}`, () => {
    expect(fill([4, 6, 8, 10], 0, 1, 3)).toEqual(_.fill([4, 6, 8, 10], 0, 1, 3));
});

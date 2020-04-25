import _ from 'lodash';
import takeRight from '../source/takeRight';

test(`takeRight([1, 2, 3]) => ${takeRight([1, 2, 3])}`, () => {
    expect(takeRight([1, 2, 3])).toEqual(_.takeRight([1, 2, 3]));
});

test(`takeRight([1, 2, 3], 2) => ${takeRight([1, 2, 3], 2)}`, () => {
    expect(takeRight([1, 2, 3], 2)).toEqual(_.takeRight([1, 2, 3], 2));
});

test(`takeRight([1, 2, 3], 5) => ${takeRight([1, 2, 3], 5)}`, () => {
    expect(takeRight([1, 2, 3], 5)).toEqual(_.takeRight([1, 2, 3], 5));
});

test(`takeRight([1, 2, 3], 0) => ${takeRight([1, 2, 3], 0)}`, () => {
    expect(takeRight([1, 2, 3], 0)).toEqual(_.takeRight([1, 2, 3], 0));
});

test(`takeRight([1, 2, 3], 0) => ${takeRight([1, 2, 3], 0)}`, () => {
    expect(takeRight([1, 2, 3], 0)).toEqual(_.takeRight([1, 2, 3], 0));
});

import _ from 'lodash';
import dropRight from '../source/dropRight';

test(`dropRight([1, 2, 3]) => ${_.dropRight([1, 2, 3])}`, () => {
    expect(dropRight([1, 2, 3])).toEqual(_.dropRight([1, 2, 3]));
});

test(`dropRight([1, 2, 3], 2) => ${_.dropRight([1, 2, 3], 2)}`, () => {
    expect(dropRight([1, 2, 3], 2)).toEqual(_.dropRight([1, 2, 3], 2));
});

test(`dropRight([1, 2, 3], 5) => ${_.dropRight([1, 2, 3], 5)}`, () => {
    expect(dropRight([1, 2, 3], 5)).toEqual(_.dropRight([1, 2, 3], 5));
});

test(`dropRight([1, 2, 3], 0) => ${_.dropRight([1, 2, 3], 0)}`, () => {
    expect(dropRight([1, 2, 3], 0)).toEqual(_.dropRight([1, 2, 3], 0));
});

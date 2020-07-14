import _ from 'lodash';
import { first } from '../source/array/first';

test(`first([1, 2, 3]) => ${first([1, 2, 3])}`, () => {
    expect(first([1, 2, 3])).toEqual(_.first([1, 2, 3]));
});

test(`first([]) => ${first([])}`, () => {
    expect(first([])).toEqual(_.first([]));
});

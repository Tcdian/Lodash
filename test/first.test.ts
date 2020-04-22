import _ from 'lodash';
import first from '../source/first';

test(`first([1, 2, 3]) => ${_.first([1, 2, 3])}`, () => {
    expect(first([1, 2, 3])).toBe(_.first([1, 2, 3]));
});

test(`first([]) => ${_.first([])}`, () => {
    expect(first([])).toBe(_.first([]));
});

import _ from 'lodash';
import { isArray } from '../source/lang';

test(`isArray([1, 2, 3]) => ${isArray([1, 2, 3])}`, () => {
    expect(isArray([1, 2, 3])).toBe(_.isArray([1, 2, 3]));
});

test(`isArray('abc') => ${isArray('abc')}`, () => {
    expect(isArray('abc')).toBe(_.isArray('abc'));
});

import _ from 'lodash';
import { isArrayLike } from '../source/lang';

test(`isArrayLike([1, 2, 3]) => ${isArrayLike([1, 2, 3])}`, () => {
    expect(isArrayLike([1, 2, 3])).toBe(_.isArrayLike([1, 2, 3]));
});

test(`isArrayLike('abc') => ${isArrayLike('abc')}`, () => {
    expect(isArrayLike('abc')).toBe(_.isArrayLike('abc'));
});

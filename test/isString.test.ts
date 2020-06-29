import _ from 'lodash';
import { isString } from '../source/lang';

test(`isString('abc') => ${isString('abc')}`, () => {
    expect(isString('abc')).toBe(_.isString('abc'));
});

test(`isString(1) => ${isString(1)}`, () => {
    expect(isString(1)).toBe(_.isString(1));
});

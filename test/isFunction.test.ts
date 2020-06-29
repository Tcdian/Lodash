import _ from 'lodash';
import { isFunction } from '../source/lang';

test(`isFunction(_) => ${isFunction(_)}`, () => {
    expect(isFunction(_)).toBe(_.isFunction(_));
});

test(`isFunction(/abc/) => ${isFunction(/abc/)}`, () => {
    expect(isFunction(/abc/)).toBe(_.isFunction(/abc/));
});

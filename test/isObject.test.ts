import _ from 'lodash';
import { isObject } from '../source/lang';

test(`isObject({}) => ${isObject({})}`, () => {
    expect(isObject({})).toBe(_.isObject({}));
});

test(`isObject([1, 2, 3]) => ${isObject([1, 2, 3])}`, () => {
    expect(isObject([1, 2, 3])).toBe(_.isObject([1, 2, 3]));
});

test(`isObject(null) => ${isObject(null)}`, () => {
    expect(isObject(null)).toBe(_.isObject(null));
});

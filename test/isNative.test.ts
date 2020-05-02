import _ from 'lodash';
import isNative from '../source/isNative';

test(`isNative(Array.prototype.push) => ${isNative(Array.prototype.push)}`, () => {
    expect(isNative(Array.prototype.push)).toBe(_.isNative(Array.prototype.push));
});

test(`isNative(_) => ${isNative(_)}`, () => {
    expect(isNative(_)).toBe(_.isNative(_));
});

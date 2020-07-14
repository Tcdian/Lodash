import _ from 'lodash';
import { isLength } from '../source/lang/isLength';

test(`isLength(3) => ${isLength(3)}`, () => {
    expect(isLength(3)).toBe(_.isLength(3));
});

test(`isLength(Number.MIN_VALUE) => ${isLength(Number.MIN_VALUE)}`, () => {
    expect(isLength(Number.MIN_VALUE)).toBe(_.isLength(Number.MIN_VALUE));
});

test(`isLength(Infinity) => ${isLength(Infinity)}`, () => {
    expect(isLength(Infinity)).toBe(_.isLength(Infinity));
});

test(`isLength('3') => ${isLength('3')}`, () => {
    expect(isLength('3')).toBe(_.isLength('3'));
});

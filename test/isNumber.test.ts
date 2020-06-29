import _ from 'lodash';
import { isNumber } from '../source/lang';

test(`isNumber(3) => ${isNumber(3)}`, () => {
    expect(isNumber(3)).toBe(_.isNumber(3));
});

test(`isNumber(Number.MIN_VALUE) =>${isNumber(Number.MIN_VALUE)}`, () => {
    expect(isNumber(Number.MIN_VALUE)).toBe(_.isNumber(Number.MIN_VALUE));
});

test(`isNumber(Infinity) => ${isNumber(Infinity)}`, () => {
    expect(isNumber(Infinity)).toBe(_.isNumber(Infinity));
});

test(`isNumber('3') => ${isNumber('3')}`, () => {
    expect(isNumber('3')).toBe(_.isNumber('3'));
});

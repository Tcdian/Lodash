import _ from 'lodash';
import isFinite from '../source/isFinite';

test(`isFinite(3) => ${isFinite(3)}`, () => {
    expect(isFinite(3)).toBe(_.isFinite(3));
});

test(`isFinite(Number.MIN_VALUE) => ${isFinite(Number.MIN_VALUE)}`, () => {
    expect(isFinite(Number.MIN_VALUE)).toBe(_.isFinite(Number.MIN_VALUE));
});

test(`isFinite(Infinity) => ${isFinite(Infinity)}`, () => {
    expect(isFinite(Infinity)).toBe(_.isFinite(Infinity));
});

test(`isFinite('3') => ${isFinite('3')}`, () => {
    expect(isFinite('3')).toBe(_.isFinite('3'));
});

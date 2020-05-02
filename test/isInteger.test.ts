import _ from 'lodash';
import isInteger from '../source/isInteger';

test(`isInteger(3) => ${isInteger(3)}`, () => {
    expect(isInteger(3)).toBe(_.isInteger(3));
});

test(`isInteger(Number.MIN_VALUE) => ${isInteger(Number.MIN_VALUE)}`, () => {
    expect(isInteger(Number.MIN_VALUE)).toBe(_.isInteger(Number.MIN_VALUE));
});

test(`isInteger(Infinity) => ${isInteger(Infinity)}`, () => {
    expect(isInteger(Infinity)).toBe(_.isInteger(Infinity));
});

test(`isInteger('3') => ${isInteger('3')}`, () => {
    expect(isInteger('3')).toBe(_.isInteger('3'));
});

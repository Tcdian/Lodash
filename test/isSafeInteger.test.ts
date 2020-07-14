import _ from 'lodash';
import { isSafeInteger } from '../source/lang/isSafeInteger';

test(`isSafeInteger(3) => ${isSafeInteger(3)}`, () => {
    expect(isSafeInteger(3)).toBe(_.isSafeInteger(3));
});

test(`isSafeInteger(Number.MIN_VALUE) => ${isSafeInteger(Number.MIN_VALUE)}`, () => {
    expect(isSafeInteger(Number.MIN_VALUE)).toBe(_.isSafeInteger(Number.MIN_VALUE));
});

test(`isSafeInteger(Infinity) => ${isSafeInteger(Infinity)}`, () => {
    expect(isSafeInteger(Infinity)).toBe(_.isSafeInteger(Infinity));
});

test(`isSafeInteger('3') => ${isSafeInteger('3')}`, () => {
    expect(isSafeInteger('3')).toBe(_.isSafeInteger('3'));
});

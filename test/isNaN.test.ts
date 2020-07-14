import _ from 'lodash';
import { isNaN } from '../source/lang/isNaN';

test(`isNaN(NaN) => ${isNaN(NaN)}`, () => {
    expect(isNaN(NaN)).toBe(_.isNaN(NaN));
});

test(`isNaN(new Number(NaN)) => ${isNaN(new Number(NaN))}`, () => {
    expect(isNaN(new Number(NaN))).toBe(_.isNaN(new Number(NaN)));
});

test(`isNaN(undefined) => ${isNaN(undefined)}`, () => {
    expect(isNaN(undefined)).toBe(_.isNaN(undefined));
});

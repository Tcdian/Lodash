import _ from 'lodash';
import isNil from '../source/isNil';

test(`isNil(null) => ${isNil(null)}`, () => {
    expect(isNil(null)).toBe(_.isNil(null));
});

test(`isNil(void 0) => ${isNil(void 0)}`, () => {
    expect(isNil(void 0)).toBe(_.isNil(void 0));
});

test(`isNil(NaN) => ${isNil(NaN)}`, () => {
    expect(isNil(NaN)).toBe(_.isNil(NaN));
});

import _ from 'lodash';
import isUndefined from '../source/isUndefined';

test(`isUndefined(void 0) => ${isUndefined(void 0)}`, () => {
    expect(isUndefined(void 0)).toBe(_.isUndefined(void 0));
});

test(`isUndefined(null) => ${isUndefined(null)}`, () => {
    expect(isUndefined(null)).toBe(_.isUndefined(null));
});

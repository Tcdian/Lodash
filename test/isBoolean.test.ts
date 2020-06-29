import _ from 'lodash';
import { isBoolean } from '../source/lang';

test(`isBoolean(false) => ${isBoolean(false)}`, () => {
    expect(isBoolean(false)).toBe(_.isBoolean(false));
});

test(`isBoolean(null) => ${isBoolean(null)}`, () => {
    expect(isBoolean(null)).toBe(_.isBoolean(null));
});

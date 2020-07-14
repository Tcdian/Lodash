import _ from 'lodash';
import { isRegExp } from '../source/lang/isRegExp';

test(`isRegExp(/abc/) => ${isRegExp(/abc/)}`, () => {
    expect(isRegExp(/abc/)).toBe(_.isRegExp(/abc/));
});

test(`isRegExp('/abc/') => ${isRegExp('/abc/')}`, () => {
    expect(isRegExp('/abc/')).toBe(_.isRegExp('/abc/'));
});

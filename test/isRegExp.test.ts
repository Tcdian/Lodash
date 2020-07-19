import { isRegExp } from '../source/lang/isRegExp';

test(`isRegExp(/abc/) => ${isRegExp(/abc/)}`, () => {
    expect(isRegExp(/abc/)).toBe(true);
});

test(`isRegExp('/abc/') => ${isRegExp('/abc/')}`, () => {
    expect(isRegExp('/abc/')).toBe(false);
});

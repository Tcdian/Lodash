import { isString } from '../source/lang/isString';

test(`isString('abc') => ${isString('abc')}`, () => {
    expect(isString('abc')).toBe(true);
});

test(`isString(1) => ${isString(1)}`, () => {
    expect(isString(1)).toBe(false);
});

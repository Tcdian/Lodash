import { isArray } from '../source/lang/isArray';

test(`isArray([1, 2, 3]) => ${isArray([1, 2, 3])}`, () => {
    expect(isArray([1, 2, 3])).toBe(true);
});

test(`isArray('abc') => ${isArray('abc')}`, () => {
    expect(isArray('abc')).toBe(false);
});

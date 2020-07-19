import { isObject } from '../source/lang/isObject';

test(`isObject({}) => ${isObject({})}`, () => {
    expect(isObject({})).toBe(true);
});

test(`isObject([1, 2, 3]) => ${isObject([1, 2, 3])}`, () => {
    expect(isObject([1, 2, 3])).toBe(true);
});

test(`isObject(null) => ${isObject(null)}`, () => {
    expect(isObject(null)).toBe(false);
});

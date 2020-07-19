import { isFunction } from '../source/lang/isFunction';

test(`isFunction(() => {}) => ${isFunction(() => {})}`, () => {
    expect(isFunction(() => {})).toBe(true);
});

test(`isFunction(/abc/) => ${isFunction(/abc/)}`, () => {
    expect(isFunction(/abc/)).toBe(false);
});

import { isBoolean } from '../source/lang/isBoolean';

test(`isBoolean(false) => ${isBoolean(false)}`, () => {
    expect(isBoolean(false)).toBe(true);
});

test(`isBoolean(null) => ${isBoolean(null)}`, () => {
    expect(isBoolean(null)).toBe(false);
});

import { isUndefined } from '../source/lang/isUndefined';

test(`isUndefined(void 0) => ${isUndefined(void 0)}`, () => {
    expect(isUndefined(void 0)).toBe(true);
});

test(`isUndefined(null) => ${isUndefined(null)}`, () => {
    expect(isUndefined(null)).toBe(false);
});

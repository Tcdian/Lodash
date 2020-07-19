import { isNil } from '../source/lang/isNil';

test(`isNil(null) => ${isNil(null)}`, () => {
    expect(isNil(null)).toBe(true);
});

test(`isNil(void 0) => ${isNil(void 0)}`, () => {
    expect(isNil(void 0)).toBe(true);
});

test(`isNil(NaN) => ${isNil(NaN)}`, () => {
    expect(isNil(NaN)).toBe(false);
});

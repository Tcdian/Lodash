import { isNull } from '../source/lang/isNull';

test(`isNull(null) => ${isNull(null)}`, () => {
    expect(isNull(null)).toBe(true);
});

test(`isNull(void 0) => ${isNull(void 0)}`, () => {
    expect(isNull(void 0)).toBe(false);
});

import { isArrayLike } from '../source/lang/isArrayLike';

test(`isArrayLike([1, 2, 3]) => ${isArrayLike([1, 2, 3])}`, () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
});

test(`isArrayLike('abc') => ${isArrayLike('abc')}`, () => {
    expect(isArrayLike('abc')).toBe(true);
});

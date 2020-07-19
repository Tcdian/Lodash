import { min } from '../source/math/min';

test(`min([4, 2, 8, 6]) => ${min([4, 2, 8, 6])}`, () => {
    expect(min([4, 2, 8, 6])).toBe(2);
});

test(`min(['a', 'b', 'c']) => ${min(['a', 'b', 'c'])}`, () => {
    expect(min(['a', 'b', 'c'])).toBe('a');
});

test(`min([]) => ${min([])}`, () => {
    expect(min([])).toBe(undefined);
});

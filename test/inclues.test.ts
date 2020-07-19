import { includes } from '../source/collection/includes';

test(`includes([1, 2, 3], 1) => ${includes([1, 2, 3], 1)}`, () => {
    expect(includes([1, 2, 3], 1)).toBe(true);
});

test(`includes([1, 2, 3], 1, 2) => ${includes([1, 2, 3], 1, 2)}`, () => {
    expect(includes([1, 2, 3], 1, 2)).toBe(false);
});

test(`includes({ 'a': 1, 'b': 2 }, 1) => ${includes({ a: 1, b: 2 }, 1)}`, () => {
    expect(includes({ a: 1, b: 2 }, 1)).toBe(true);
});

test(`includes('abcd', 'bc') => ${includes('abcd', 'bc')}`, () => {
    expect(includes('abcd', 'bc')).toBe(true);
});

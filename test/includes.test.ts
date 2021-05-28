import { includes } from '../source/collection/includes';

test('includes([1, 2, 3], 1) => true', () => {
    expect(includes([1, 2, 3], 1)).toBe(true);
});

test('includes([1, 2, 3], 1, 2) => false', () => {
    expect(includes([1, 2, 3], 1, 2)).toBe(false);
});

test('includes({ a: 1, b: 2 }, 1) => true', () => {
    expect(includes({ a: 1, b: 2 }, 1)).toBe(true);
});

test("includes('abcd', 'bc')", () => {
    expect(includes('abcd', 'bc')).toBe(true);
});

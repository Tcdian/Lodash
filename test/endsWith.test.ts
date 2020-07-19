import { endsWith } from '../source/string/endsWith';

test(`endsWith('abc', 'c') => ${endsWith('abc', 'c')}`, () => {
    expect(endsWith('abc', 'c')).toBe(true);
});

test(`endsWith('abc', 'b') => ${endsWith('abc', 'b')}`, () => {
    expect(endsWith('abc', 'b')).toBe(false);
});

test(`endsWith('abc', 'b', 2) => ${endsWith('abc', 'b', 2)}`, () => {
    expect(endsWith('abc', 'b', 2)).toBe(true);
});

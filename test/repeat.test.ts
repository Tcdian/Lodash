import { repeat } from '../source/string/repeat';

test(`repeat => ${repeat('*', 3)}`, () => {
    expect(repeat('*', 3)).toBe('***');
});

test(`repeat('abc', 2) => ${repeat('abc', 2)}`, () => {
    expect(repeat('abc', 2)).toBe('abcabc');
});

test(`repeat('abc', 0) => ${repeat('abc', 0)}`, () => {
    expect(repeat('abc', 0)).toBe('');
});

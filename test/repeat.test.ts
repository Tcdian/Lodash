import { repeat } from '../source/string/repeat';

describe('repeat', () => {
    test('repeat => "***"', () => {
        expect(repeat('*', 3)).toBe('***');
    });

    test('repeat("abc", 2) => "abcabc"', () => {
        expect(repeat('abc', 2)).toBe('abcabc');
    });

    test('repeat("abc", 0) => ""', () => {
        expect(repeat('abc', 0)).toBe('');
    });
});

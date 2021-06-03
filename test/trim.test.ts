import { trim } from '../source/string/trim';

describe('trim', () => {
    test('trim("  abc  ") => "abc"', () => {
        expect(trim('  abc  ')).toBe('abc');
    });

    test('trim("-_-abc-_-", "_-") => "abc"', () => {
        expect(trim('-_-abc-_-', '_-')).toBe('abc');
    });

    test('["  foo  ", "  bar  "].map(trim) => ["foo", "bar"]', () => {
        expect(['  foo  ', '  bar  '].map(trim)).toEqual(['foo', 'bar']);
    });
});

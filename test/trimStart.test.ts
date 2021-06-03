import { trimStart } from '../source/string/trimStart';

describe('trimStart', () => {
    test('trimStart("  abc  ") => "abc  "', () => {
        expect(trimStart('  abc  ')).toBe('abc  ');
    });

    test('trimStart("-_-abc-_-", "_-") => "abc-_-"', () => {
        expect(trimStart('-_-abc-_-', '_-')).toBe('abc-_-');
    });

    test('["  foo  ", "  bar  "].map(trimStart) => ["foo  ", "bar  "]', () => {
        expect(['  foo  ', '  bar  '].map(trimStart)).toEqual(['foo  ', 'bar  ']);
    });
});

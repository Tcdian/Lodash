import { trimEnd } from '../source/string/trimEnd';

describe('trimEnd', () => {
    test('trimEnd("  abc  ") => "  abc"', () => {
        expect(trimEnd('  abc  ')).toBe('  abc');
    });

    test('trimEnd("-_-abc-_-", "_-") => "-_-abc"', () => {
        expect(trimEnd('-_-abc-_-', '_-')).toBe('-_-abc');
    });

    test('["  foo  ", "  bar  "].map(trimEnd) => ["  foo", "  bar"]', () => {
        expect(['  foo  ', '  bar  '].map(trimEnd)).toEqual(['  foo', '  bar']);
    });
});

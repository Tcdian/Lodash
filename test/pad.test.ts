import { pad } from '../source/string/pad';

describe('pad', () => {
    test('pad("abc", 8) => "  abc   "', () => {
        expect(pad('abc', 8)).toBe('  abc   ');
    });

    test('pad("abc", 8, "_-") => "_-abc_-_"', () => {
        expect(pad('abc', 8, '_-')).toBe('_-abc_-_');
    });

    test('pad("abc", 3) => "abc"', () => {
        expect(pad('abc', 3)).toBe('abc');
    });
});

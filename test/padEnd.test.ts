import { padEnd } from '../source/string/padEnd';

describe('padEnd', () => {
    test('padEnd("abc", 6) => "abc   "', () => {
        expect(padEnd('abc', 6)).toBe('abc   ');
    });

    test('padEnd("abc", 6, "_-") => "abc_-_"', () => {
        expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
    });

    test('padEnd("abc", 3) => "abc"', () => {
        expect(padEnd('abc', 3)).toBe('abc');
    });
});

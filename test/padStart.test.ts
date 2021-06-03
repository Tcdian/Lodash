import { padStart } from '../source/string/padStart';

describe('padStart', () => {
    test('padStart("abc", 6) => "   abc"', () => {
        expect(padStart('abc', 6)).toBe('   abc');
    });

    test('padStart("abc", 6, "_-") => "_-_abc"', () => {
        expect(padStart('abc', 6, '_-')).toBe('_-_abc');
    });

    test('padStart("abc", 3) => "abc"', () => {
        expect(padStart('abc', 3)).toBe('abc');
    });
});

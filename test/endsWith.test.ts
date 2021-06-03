import { endsWith } from '../source/string/endsWith';

describe('endsWith', () => {
    test('endsWith("abc", "c") => true', () => {
        expect(endsWith('abc', 'c')).toBe(true);
    });

    test('endsWith("abc", "b") => false', () => {
        expect(endsWith('abc', 'b')).toBe(false);
    });

    test('endsWith("abc", "b", 2) => true', () => {
        expect(endsWith('abc', 'b', 2)).toBe(true);
    });
});

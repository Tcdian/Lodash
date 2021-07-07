import { startsWith } from '../source/string/startsWith';

describe('startsWith', () => {
    test('startsWith("abc", "a") => true', () => {
        expect(startsWith('abc', 'a')).toBe(true);
    });

    test('startsWith("abc", "b") => false', () => {
        expect(startsWith('abc', 'b')).toBe(false);
    });

    test('startsWith("abc", "b", 1) => true', () => {
        expect(startsWith('abc', 'b', 1)).toBe(true);
    });
});

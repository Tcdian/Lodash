import { eq } from '../source/lang/eq';

describe('eq', () => {
    test('eq("a", "a") => true', () => {
        expect(eq('a', 'a')).toBe(true);
    });

    test('eq("a", Object("a")) => false', () => {
        expect(eq('a', Object('a'))).toBe(false);
    });

    test('eq({ "a": 1 }, { "a": 1 }) => false', () => {
        expect(eq({ a: 1 }, { a: 1 })).toBe(false);
    });

    test('eq(NaN, NaN) => true', () => {
        expect(eq(NaN, NaN)).toBe(true);
    });
});

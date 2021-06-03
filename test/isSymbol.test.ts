import { isSymbol } from '../source/lang/isSymbol';

describe('isSymbol', () => {
    test('isSymbol(Symbol.iterator) => true', () => {
        expect(isSymbol(Symbol.iterator)).toBe(true);
    });

    test('isSymbol("abc") => false', () => {
        expect(isSymbol('abc')).toBe(false);
    });
});

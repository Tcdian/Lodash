import { toString } from '../source/lang/toString';

describe('toString', () => {
    test('toString(null) => ""', () => {
        expect(toString(null)).toBe('');
    });

    test('toString(-0) => "-0"', () => {
        expect(toString(-0)).toBe('-0');
    });

    test('toString([1, 2, 3]) => "1,2,3"', () => {
        expect(toString([1, 2, 3])).toBe('1,2,3');
    });

    test('toString(Symbol(1)) => "Symbol(1)"', () => {
        expect(toString(Symbol(1))).toBe('Symbol(1)');
    });

    test('toString([Symbol(1), Symbol(2), Symbol(3)]) => "Symbol(1),Symbol(2),Symbol(3)"', () => {
        expect(toString([Symbol(1), Symbol(2), Symbol(3)])).toBe('Symbol(1),Symbol(2),Symbol(3)');
    });
});

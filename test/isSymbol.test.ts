import { isSymbol } from '../source/lang/isSymbol';

test(`isSymbol(Symbol.iterator) => ${isSymbol(Symbol.iterator)}`, () => {
    expect(isSymbol(Symbol.iterator)).toBe(true);
});

test(`isSymbol('abc') => ${isSymbol('abc')}`, () => {
    expect(isSymbol('abc')).toBe(false);
});

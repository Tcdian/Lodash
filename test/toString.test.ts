import { toString } from '../source/lang/toString';

test(`toString(null) => ${toString(null)}`, () => {
    expect(toString(null)).toBe('');
});

test(`toString(-0) => ${toString(-0)}`, () => {
    expect(toString(-0)).toBe('-0');
});

test(`toString([1, 2, 3]) => ${toString([1, 2, 3])}`, () => {
    expect(toString([1, 2, 3])).toBe('1,2,3');
});

test(`toString(Symbol(1)) => ${toString(Symbol(1))}`, () => {
    expect(toString(Symbol(1))).toBe('Symbol(1)');
});

test(`toString([Symbol(1), Symbol(2), Symbol(3)]) => ${toString([Symbol(1), Symbol(2), Symbol(3)])}`, () => {
    expect(toString([Symbol(1), Symbol(2), Symbol(3)])).toBe('Symbol(1),Symbol(2),Symbol(3)');
});

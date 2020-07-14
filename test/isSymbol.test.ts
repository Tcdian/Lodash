import _ from 'lodash';
import { isSymbol } from '../source/lang/isSymbol';

test(`isSymbol(Symbol.iterator) => ${isSymbol(Symbol.iterator)}`, () => {
    expect(isSymbol(Symbol.iterator)).toBe(_.isSymbol(Symbol.iterator));
});

test(`isSymbol('abc') => ${isSymbol('abc')}`, () => {
    expect(isSymbol('abc')).toBe(_.isSymbol('abc'));
});

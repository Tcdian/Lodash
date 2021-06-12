import { toNumber } from '../source/lang/toNumber';

describe('toNumber', () => {
    test('toNumber(3.2) => 3.2', () => {
        expect(toNumber(3.2)).toBe(3.2);
    });

    test('toNumber(Number.MIN_VALUE) => 5e-324', () => {
        expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });

    test('toNumber(Infinity) => Infinity', () => {
        expect(toNumber(Infinity)).toBe(Infinity);
    });

    test('toNumber("3.2") => 3.2', () => {
        expect(toNumber('3.2')).toBe(3.2);
    });
});

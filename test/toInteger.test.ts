import { toInteger } from '../source/lang/toInteger';

describe('toInteger', () => {
    test('toInteger(3.2) => 3', () => {
        expect(toInteger(3.2)).toBe(3);
    });

    test('toInteger(Number.MIN_VALUE) => 0', () => {
        expect(toInteger(Number.MIN_VALUE)).toBe(0);
    });

    test('toInteger(Infinity) => 1.7976931348623157e+308', () => {
        expect(toInteger(Infinity)).toBe(1.7976931348623157e308);
    });

    test('toInteger("3.2") => 3', () => {
        expect(toInteger('3.2')).toBe(3);
    });
});

import { toFinite } from '../source/lang/toFinite';

describe('toFinite', () => {
    test('toFinite(3.2) => 3.2', () => {
        expect(toFinite(3.2)).toBe(3.2);
    });

    test('toFinite(Number.MIN_VALUE) => 5e-324', () => {
        expect(toFinite(Number.MIN_VALUE)).toBe(5e-324);
    });

    test('toFinite(Infinity) => 1.7976931348623157e+308', () => {
        expect(toFinite(Infinity)).toBe(1.7976931348623157e308);
    });

    test('toFinite("3.2")=> 3.2', () => {
        expect(toFinite('3.2')).toBe(3.2);
    });
});

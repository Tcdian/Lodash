import { isFinite } from '../source/lang/isFinite';

describe('isFinite', () => {
    test('isFinite(3) => true', () => {
        expect(isFinite(3)).toBe(true);
    });

    test('isFinite(Number.MIN_VALUE) => true', () => {
        expect(isFinite(Number.MIN_VALUE)).toBe(true);
    });

    test('isFinite(Infinity) => false', () => {
        expect(isFinite(Infinity)).toBe(false);
    });

    test('isFinite("3") => false', () => {
        expect(isFinite('3')).toBe(false);
    });
});

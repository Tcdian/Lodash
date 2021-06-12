import { toLength } from '../source/lang/toLength';

describe('toLength', () => {
    test('toLength(3.2) => 3', () => {
        expect(toLength(3.2)).toBe(3);
    });

    test('toLength(Number.MIN_VALUE) => 0', () => {
        expect(toLength(Number.MIN_VALUE)).toBe(0);
    });

    test('toLength(Infinity) => 4294967295', () => {
        expect(toLength(Infinity)).toBe(4294967295);
    });

    test('toLength("3.2") => 3', () => {
        expect(toLength('3.2')).toBe(3);
    });
});

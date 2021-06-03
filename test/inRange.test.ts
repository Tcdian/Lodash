import { inRange } from '../source/number/inRange';

describe('inRange', () => {
    test('inRange(3, 2, 4) => true', () => {
        expect(inRange(3, 2, 4)).toBe(true);
    });

    test('inRange(4, 8) => true', () => {
        expect(inRange(4, 8)).toBe(true);
    });

    test('inRange(4, 2) => false', () => {
        expect(inRange(4, 2)).toBe(false);
    });

    test('inRange(2, 2) => false', () => {
        expect(inRange(2, 2)).toBe(false);
    });

    test('inRange(1.2, 2) => true', () => {
        expect(inRange(1.2, 2)).toBe(true);
    });

    test('inRange(5.2, 4) => false', () => {
        expect(inRange(5.2, 4)).toBe(false);
    });

    test('inRange(-3, -2, -6) => true', () => {
        expect(inRange(-3, -2, -6)).toBe(true);
    });
});

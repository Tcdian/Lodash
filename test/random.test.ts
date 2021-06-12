import { random } from '../source/number/random';

describe('random', () => {
    test('random(0, 5) => an integer between 0 and 5', () => {
        const rand = random(0, 5);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThanOrEqual(5);
        expect(rand % 1).toBe(0);
    });

    test('random(5) => an integer between 0 and 5', () => {
        const rand = random(5);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThanOrEqual(5);
        expect(rand % 1).toBe(0);
    });

    test('random(5, true) => a floating-point number between 0 and 5', () => {
        const rand = random(5, true);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThanOrEqual(5);
    });

    test('random(1.2, 5.2) => a floating-point number between 1.2 and 5.2', () => {
        const rand = random(1.2, 5.2);
        expect(rand).toBeGreaterThanOrEqual(1.2);
        expect(rand).toBeLessThanOrEqual(5.2);
    });
});

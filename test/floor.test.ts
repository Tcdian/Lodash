import { floor } from '../source/math/floor';

describe('floor', () => {
    test('floor(4.006) => 4', () => {
        expect(floor(4.006)).toBe(4);
    });

    test('floor(0.046, 2) => 0.04', () => {
        expect(floor(0.046, 2)).toBe(0.04);
    });

    test('floor(4060, -2) => 4000', () => {
        expect(floor(4060, -2)).toBe(4000);
    });
});

import { round } from '../source/math/round';

describe('round', () => {
    test('round(4.006) => 4', () => {
        expect(round(4.006)).toBe(4);
    });

    test('round(4.006, 2) => 4.01', () => {
        expect(round(4.006, 2)).toBe(4.01);
    });

    test('round(4060, -2) => 4100', () => {
        expect(round(4060, -2)).toBe(4100);
    });
});

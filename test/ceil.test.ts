import { ceil } from '../source/math/ceil';

describe('ceil', () => {
    test('ceil(4.006) => 5', () => {
        expect(ceil(4.006)).toBe(5);
    });

    test('ceil(6.004, 2) => 6.01', () => {
        expect(ceil(6.004, 2)).toBe(6.01);
    });

    test('ceil(6040, -2) => 6100', () => {
        expect(ceil(6040, -2)).toBe(6100);
    });
});

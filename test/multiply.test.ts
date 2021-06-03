import { multiply } from '../source/math/multiply';

describe('multiply', () => {
    test('multiply(6, 4) => 24', () => {
        expect(multiply(6, 4)).toBe(24);
    });
});

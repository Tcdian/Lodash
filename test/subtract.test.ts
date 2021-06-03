import { subtract } from '../source/math/subtract';

describe('subtract', () => {
    test('subtract(6, 4) => 2', () => {
        expect(subtract(6, 4)).toBe(2);
    });
});

import { mean } from '../source/math/mean';

describe('mean', () => {
    test('mean([4, 2, 8, 6]) => 5', () => {
        expect(mean([4, 2, 8, 6])).toBe(5);
    });
});

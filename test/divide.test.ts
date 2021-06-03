import { divide } from '../source/math/divide';

describe('divide', () => {
    test('divide(6, 4) => 1.5', () => {
        expect(divide(6, 4)).toBe(1.5);
    });
});

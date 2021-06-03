import { sum } from '../source/math/sum';

describe('sum', () => {
    test('sum([4, 2, 8, 6]) => 20', () => {
        expect(sum([4, 2, 8, 6])).toBe(20);
    });
});

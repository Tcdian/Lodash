import { last } from '../source/array/last';

describe('last', () => {
    test('last([1, 2, 3]) => 3', () => {
        expect(last([1, 2, 3])).toBe(3);
    });
});

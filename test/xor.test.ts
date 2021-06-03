import { xor } from '../source/array/xor';

describe('xor', () => {
    test('xor([2, 1], [2, 3]) => [1, 3]', () => {
        expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
    });

    test('xor([1, 2, 1], [2, 3]) => [1, 3]', () => {
        expect(xor([1, 2, 1], [2, 3])).toEqual([1, 3]);
    });

    test('xor([], [2, 1], [2, 3]) => [1, 3]', () => {
        expect(xor([], [2, 1], [2, 3])).toEqual([1, 3]);
    });
});

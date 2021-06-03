import { fill } from '../source/array/fill';

describe('fill', () => {
    test('fill([1, 2, 3], 5) => [5, 5, 5]', () => {
        expect(fill([1, 2, 3], 5)).toEqual([5, 5, 5]);
    });

    test('fill(Array(3), 2) => [2, 2, 2]', () => {
        expect(fill(Array(3), 2)).toEqual([2, 2, 2]);
    });

    test('fill([4, 6, 8, 10], 0, 1, 3) => [4, 0, 0, 10]', () => {
        expect(fill([4, 6, 8, 10], 0, 1, 3)).toEqual([4, 0, 0, 10]);
    });
});

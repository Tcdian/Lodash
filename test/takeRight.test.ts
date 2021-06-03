import { takeRight } from '../source/array/takeRight';

describe('takeRight', () => {
    test('takeRight([1, 2, 3]) => [3]', () => {
        expect(takeRight([1, 2, 3])).toEqual([3]);
    });

    test('takeRight([1, 2, 3], 2) => [2, 3]', () => {
        expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
    });

    test('takeRight([1, 2, 3], 5) => [1, 2, 3]', () => {
        expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });

    test('takeRight([1, 2, 3], 0) => []', () => {
        expect(takeRight([1, 2, 3], 0)).toEqual([]);
    });

    test('takeRight([1, 2, 3], -1) => []', () => {
        expect(takeRight([1, 2, 3], -1)).toEqual([]);
    });
});

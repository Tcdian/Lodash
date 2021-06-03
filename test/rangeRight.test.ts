import { rangeRight } from '../source/util/rangeRight';

describe('rangeRight', () => {
    test('rangeRight(4) => [3, 2, 1, 0]', () => {
        expect(rangeRight(4)).toEqual([3, 2, 1, 0]);
    });

    test('rangeRight(-4) => [-3, -2, -1, 0]', () => {
        expect(rangeRight(-4)).toEqual([-3, -2, -1, 0]);
    });

    test('rangeRight(1, 5) => [4, 3, 2, 1]', () => {
        expect(rangeRight(1, 5)).toEqual([4, 3, 2, 1]);
    });

    test('rangeRight(0, 20, 5) => [15, 10, 5, 0]', () => {
        expect(rangeRight(0, 20, 5)).toEqual([15, 10, 5, 0]);
    });

    test('rangeRight(0, -4, -1) => [-3, -2, -1, 0]', () => {
        expect(rangeRight(0, -4, -1)).toEqual([-3, -2, -1, 0]);
    });

    test('rangeRight(1, 4, 0) => [1, 1, 1]', () => {
        expect(rangeRight(1, 4, 0)).toEqual([1, 1, 1]);
    });

    test('rangeRight(0) => []', () => {
        expect(rangeRight(0)).toEqual([]);
    });
});

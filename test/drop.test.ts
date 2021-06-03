import { drop } from '../source/array/drop';

describe('drop', () => {
    test('drop([1, 2, 3]) => [2, 3]', () => {
        expect(drop([1, 2, 3])).toEqual([2, 3]);
    });

    test('drop([1, 2, 3], 2) => [3]', () => {
        expect(drop([1, 2, 3], 2)).toEqual([3]);
    });

    test('drop([1, 2, 3], 5) => []', () => {
        expect(drop([1, 2, 3], 5)).toEqual([]);
    });

    test('drop([1, 2, 3], 0) => [1, 2, 3]', () => {
        expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
    });
});

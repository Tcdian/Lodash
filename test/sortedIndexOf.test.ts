import { sortedIndexOf } from '../source/array/sortedIndexOf';

describe('sortedIndexOf', () => {
    test('sortedIndexOf([4, 5, 5, 5, 8], 5) => 1', () => {
        expect(sortedIndexOf([4, 5, 5, 5, 8], 5)).toBe(1);
    });

    test('sortedIndexOf([4, 5, 5, 5, 8], 1) => -1', () => {
        expect(sortedIndexOf([4, 5, 5, 5, 8], 1)).toBe(-1);
    });

    test('sortedIndexOf([4, 5, 5, 5, 8], 9) => -1', () => {
        expect(sortedIndexOf([4, 5, 5, 5, 8], 9)).toBe(-1);
    });

    test('sortedIndexOf([4, 5, 5, 5, 8], 6) => -1', () => {
        expect(sortedIndexOf([4, 5, 5, 5, 8], 6)).toBe(-1);
    });
});

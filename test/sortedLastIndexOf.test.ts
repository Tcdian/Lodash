import { sortedLastIndexOf } from '../source/array/sortedLastIndexOf';

describe('sortedLastIndexOf', () => {
    test('sortedLastIndexOf([4, 5, 5, 5, 8], 5) => 3', () => {
        expect(sortedLastIndexOf([4, 5, 5, 5, 8], 5)).toBe(3);
    });

    test('sortedLastIndexOf([4, 5, 5, 5, 8], 1) => -1', () => {
        expect(sortedLastIndexOf([4, 5, 5, 5, 8], 1)).toBe(-1);
    });

    test('sortedLastIndexOf([4, 5, 5, 5, 8], 9) => -1', () => {
        expect(sortedLastIndexOf([4, 5, 5, 5, 8], 9)).toBe(-1);
    });

    test('sortedLastIndexOf([4, 5, 5, 5, 8], 6) => -1', () => {
        expect(sortedLastIndexOf([4, 5, 5, 5, 8], 6)).toBe(-1);
    });
});

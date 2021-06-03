import { sortedIndex } from '../source/array/sortedIndex';

describe('sortedIndex', () => {
    test('sortedIndex([4, 5, 5, 5, 8], 5) => 1', () => {
        expect(sortedIndex([4, 5, 5, 5, 8], 5)).toBe(1);
    });

    test('sortedIndex([4, 5, 5, 5, 8], 1) => 0', () => {
        expect(sortedIndex([4, 5, 5, 5, 8], 1)).toBe(0);
    });

    test('sortedIndex([4, 5, 5, 5, 8], 9) => 5', () => {
        expect(sortedIndex([4, 5, 5, 5, 8], 9)).toBe(5);
    });

    test('sortedIndex([4, 5, 5, 5, 8], 6) => 4', () => {
        expect(sortedIndex([4, 5, 5, 5, 8], 6)).toBe(4);
    });
});

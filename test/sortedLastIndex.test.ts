import { sortedLastIndex } from '../source/array/sortedLastIndex';

describe('sortedLastIndex', () => {
    test('sortedLastIndex([4, 5, 5, 5, 8], 5) => 4', () => {
        expect(sortedLastIndex([4, 5, 5, 5, 8], 5)).toBe(4);
    });

    test('sortedLastIndex([4, 5, 5, 5, 8], 1) => 0', () => {
        expect(sortedLastIndex([4, 5, 5, 5, 8], 1)).toBe(0);
    });

    test('sortedLastIndex([4, 5, 5, 5, 8], 9) => 5', () => {
        expect(sortedLastIndex([4, 5, 5, 5, 8], 9)).toBe(5);
    });

    test('sortedLastIndex([4, 5, 5, 5, 8], 6) => 4', () => {
        expect(sortedLastIndex([4, 5, 5, 5, 8], 6)).toBe(4);
    });
});

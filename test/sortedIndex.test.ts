import { sortedIndex } from '../source/array/sortedIndex';

test(`sortedIndex([4, 5, 5, 5, 8], 5) => ${sortedIndex([4, 5, 5, 5, 8], 5)}`, () => {
    expect(sortedIndex([4, 5, 5, 5, 8], 5)).toBe(1);
});

test(`sortedIndex([4, 5, 5, 5, 8], 1) => ${sortedIndex([4, 5, 5, 5, 8], 1)}`, () => {
    expect(sortedIndex([4, 5, 5, 5, 8], 1)).toBe(0);
});

test(`sortedIndex([4, 5, 5, 5, 8], 9) => ${sortedIndex([4, 5, 5, 5, 8], 9)}`, () => {
    expect(sortedIndex([4, 5, 5, 5, 8], 9)).toBe(5);
});

test(`sortedIndex([4, 5, 5, 5, 8], 6) => ${sortedIndex([4, 5, 5, 5, 8], 6)}`, () => {
    expect(sortedIndex([4, 5, 5, 5, 8], 6)).toBe(4);
});

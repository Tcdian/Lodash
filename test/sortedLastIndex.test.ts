import { sortedLastIndex } from '../source/array/sortedLastIndex';

test(`sortedLastIndex([4, 5, 5, 5, 8], 5) => ${sortedLastIndex([4, 5, 5, 5, 8], 5)}`, () => {
    expect(sortedLastIndex([4, 5, 5, 5, 8], 5)).toBe(4);
});

test(`sortedLastIndex([4, 5, 5, 5, 8], 1) => ${sortedLastIndex([4, 5, 5, 5, 8], 1)}`, () => {
    expect(sortedLastIndex([4, 5, 5, 5, 8], 1)).toBe(0);
});

test(`sortedLastIndex([4, 5, 5, 5, 8], 9) => ${sortedLastIndex([4, 5, 5, 5, 8], 9)}`, () => {
    expect(sortedLastIndex([4, 5, 5, 5, 8], 9)).toBe(5);
});

test(`sortedLastIndex([4, 5, 5, 5, 8], 6) => ${sortedLastIndex([4, 5, 5, 5, 8], 6)}`, () => {
    expect(sortedLastIndex([4, 5, 5, 5, 8], 6)).toBe(4);
});

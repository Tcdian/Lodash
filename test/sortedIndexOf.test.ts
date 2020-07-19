import { sortedIndexOf } from '../source/array/sortedIndexOf';

test(`sortedIndexOf([4, 5, 5, 5, 8], 5) => ${sortedIndexOf([4, 5, 5, 5, 8], 5)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 5)).toBe(1);
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 1) => ${sortedIndexOf([4, 5, 5, 5, 8], 1)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 1)).toBe(-1);
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 9) => ${sortedIndexOf([4, 5, 5, 5, 8], 9)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 9)).toBe(-1);
});

test(`sortedIndexOf([4, 5, 5, 5, 8], 6) => ${sortedIndexOf([4, 5, 5, 5, 8], 6)}`, () => {
    expect(sortedIndexOf([4, 5, 5, 5, 8], 6)).toBe(-1);
});

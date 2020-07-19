import { lastIndexOf } from '../source/array/lastIndexOf';

test(`lastIndexOf([1, 2, 1, 2], 2) => ${lastIndexOf([1, 2, 1, 2], 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(3);
});

test(`lastIndexOf([1, 2, 1, 2], 2, 2) => ${lastIndexOf([1, 2, 1, 2], 2, 2)}`, () => {
    expect(lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(1);
});

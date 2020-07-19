import { take } from '../source/array/take';

test(`take([1, 2, 3]) => ${take([1, 2, 3])}`, () => {
    expect(take([1, 2, 3])).toEqual([1]);
});

test(`take([1, 2, 3], 2) => ${take([1, 2, 3], 2)}`, () => {
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
});

test(`take([1, 2, 3], 5) => ${take([1, 2, 3], 5)}`, () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
});

test(`take([1, 2, 3], 0) => ${take([1, 2, 3], 0)}`, () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
});

test(`take([1, 2, 3], -1) => ${take([1, 2, 3], -1)}`, () => {
    expect(take([1, 2, 3], -1)).toEqual([]);
});

import { xor } from '../source/array/xor';

test(`xor([2, 1], [2, 3]) => ${xor([2, 1], [2, 3])}`, () => {
    expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
});

test(`xor([1, 2, 1], [2, 3]) => ${xor([1, 2, 1], [2, 3])}`, () => {
    expect(xor([1, 2, 1], [2, 3])).toEqual([1, 3]);
});

test(`xor([], [2, 1], [2, 3]) => ${xor([], [2, 1], [2, 3])}`, () => {
    expect(xor([], [2, 1], [2, 3])).toEqual([1, 3]);
});

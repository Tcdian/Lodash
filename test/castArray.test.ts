import { castArray } from '../source/lang/castArray';

test(`castArray(1) => ${castArray(1)}`, () => {
    expect(castArray(1)).toEqual([1]);
});

test(`castArray({ 'a': 1 }) => ${castArray({ a: 1 })}`, () => {
    expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
});

test(`castArray('abc') => ${castArray('abc')}`, () => {
    expect(castArray('abc')).toEqual(['abc']);
});

test(`castArray(null) => ${castArray(null)}`, () => {
    expect(castArray(null)).toEqual([null]);
});

test(`castArray(undefined) =>${castArray(undefined)}`, () => {
    expect(castArray(undefined)).toEqual([undefined]);
});

test(`castArray() => ${castArray()}`, () => {
    expect(castArray()).toEqual([]);
});

test(`castArray([1, 2, 3]) => ${castArray([1, 2, 3])}`, () => {
    const arr = [1, 2, 3];
    expect(castArray(arr)).toBe(arr);
});

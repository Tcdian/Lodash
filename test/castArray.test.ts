import _ from 'lodash';
import { castArray } from '../source/lang';

test(`castArray(1) => ${castArray(1)}`, () => {
    expect(castArray(1)).toEqual(_.castArray(1));
});

test(`castArray({ 'a': 1 }) => ${castArray({ a: 1 })}`, () => {
    expect(castArray({ a: 1 })).toEqual(_.castArray({ a: 1 }));
});

test(`castArray('abc') => ${castArray('abc')}`, () => {
    expect(castArray('abc')).toEqual(_.castArray('abc'));
});

test(`castArray(null) => ${castArray(null)}`, () => {
    expect(castArray(null)).toEqual(_.castArray(null));
});

test(`castArray(undefined) =>${castArray(undefined)}`, () => {
    expect(castArray(undefined)).toEqual(_.castArray(undefined));
});

test(`castArray() => ${castArray()}`, () => {
    expect(castArray()).toEqual(_.castArray());
});

test(`castArray([1, 2, 3]) => ${castArray([1, 2, 3])}`, () => {
    const arr = [1, 2, 3];
    expect(castArray(arr)).toBe(arr);
});

import { castArray } from '../source/lang/castArray';

describe('castArray', () => {
    test('castArray(1) => [1]', () => {
        expect(castArray(1)).toEqual([1]);
    });

    test('castArray({ "a": 1 }) => [{ a: 1 }]', () => {
        expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
    });

    test('castArray("abc") => ["abc"]', () => {
        expect(castArray('abc')).toEqual(['abc']);
    });

    test('castArray(null) => [null]', () => {
        expect(castArray(null)).toEqual([null]);
    });

    test('castArray(undefined) => [undefined]', () => {
        expect(castArray(undefined)).toEqual([undefined]);
    });

    test('castArray() => []', () => {
        expect(castArray()).toEqual([]);
    });

    test('castArray([1, 2, 3]) => [1, 2, 3]', () => {
        const array = [1, 2, 3];
        expect(castArray(array)).toBe(array);
    });
});

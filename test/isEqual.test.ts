import { isEqual } from '../source/lang/isEqual';

describe('null & undefined', () => {
    test('null & undefined', () => {
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
    });

    test('null !== undefined', () => {
        expect(isEqual(null, undefined)).toBe(false);
    });
});

describe('boolean', () => {
    test('true & false', () => {
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(false, false)).toBe(true);
        expect(isEqual(true, false)).toBe(false);
    });

    test('new Boolean()', () => {
        expect(isEqual(new Boolean(true), new Boolean(true))).toBe(true);
        expect(isEqual(new Boolean(false), new Boolean(false))).toBe(true);
        expect(isEqual(new Boolean(true), new Boolean(false))).toBe(false);
    });
});

describe('number', () => {
    test('number', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual(1, 2)).toBe(false);
    });

    test('new Number()', () => {
        expect(isEqual(new Number(1), new Number(1))).toBe(true);
        expect(isEqual(new Number(1), 1)).toBe(true);
    });

    test('NaN', () => {
        expect(isEqual(NaN, NaN)).toBe(true);
        expect(isEqual(NaN, new Number(NaN))).toBe(true);
        expect(isEqual(new Number(NaN), new Number(NaN))).toBe(true);
    });
});

describe('string', () => {
    test('string', () => {
        expect(isEqual('a', 'a')).toBe(true);
        expect(isEqual('a', 'b')).toBe(false);
    });

    test('new String()', () => {
        expect(isEqual(new String('a'), new String('a'))).toBe(true);
        expect(isEqual(new String('a'), 'a')).toBe(true);
    });
});

describe('Symbol', () => {
    test('Symbol()', () => {
        expect(isEqual(Symbol(1), Symbol(1))).toBe(false);
    });

    test('Object(Symbol())', () => {
        const s = Symbol(1);
        expect(isEqual(Object(s), Object(s))).toBe(true);
        expect(isEqual(Object(s), Object(Symbol(1)))).toBe(false);
    });
});

type RecursiveArray = RecursiveArray[];

describe('array', () => {
    test('array', () => {
        expect(isEqual([1], [1])).toBe(true);
        expect(isEqual([1], [2])).toBe(false);
        expect(isEqual([[1], [2]], [[1], [2]])).toBe(true);
        expect(isEqual([1, 2], { 0: 1, 1: 2, length: 3 })).toBe(false);
        const arr1: RecursiveArray = [];
        const arr2: RecursiveArray = [];
        arr1[0] = arr1;
        arr2[0] = arr2;
        expect(isEqual(arr1, arr2)).toBe(true);
    });
    test('new Array()', () => {
        expect(isEqual(new Array(3), new Array(3))).toBe(true);
        expect(isEqual(new Array(3), { length: 3 })).toBe(false);
    });
});

interface RecursiveObject1 {
    a: string;
    quote?: RecursiveObject2;
}

interface RecursiveObject2 {
    b: string;
    quote?: RecursiveObject1;
}

describe('object', () => {
    test('object', () => {
        expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
        expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
        expect(isEqual({ a: { a: 1 } }, { a: { a: 1 } })).toBe(true);
        expect(isEqual({ a: [1] }, { a: [1] })).toBe(true);
        expect(isEqual({ a: { a: 1 } }, { a: { a: { a: 1 } } })).toBe(false);
    });
    test('object circular reference', () => {
        const recursiveObject1: RecursiveObject1 = { a: 'a' };
        const recursiveObject2: RecursiveObject2 = { b: 'b' };
        recursiveObject1.quote = recursiveObject2;
        recursiveObject2.quote = recursiveObject1;
        expect(isEqual(recursiveObject1, recursiveObject2)).toBe(false);
    });
});

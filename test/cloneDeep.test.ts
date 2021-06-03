import { cloneDeep } from '../source/lang/cloneDeep';

describe('cloneDeep', () => {
    test("cloneDeep([ { a: 1, [Symbol('a')]: 1 }, { b: 2, [Symbol('b')]: 2 } ])", () => {
        const objects = [
            { a: 1, [Symbol('a')]: 1 },
            { b: 2, [Symbol('b')]: 2 },
        ];

        const shallow = cloneDeep(objects);
        expect(shallow).toEqual(objects);
        expect(shallow).not.toBe(objects);
        expect(shallow[0]).not.toBe(objects[0]);
    });

    interface RecursiveArray extends Array<RecursiveArray> {}

    test('cloneDeep 循环引用数组', () => {
        const recursiveArray: RecursiveArray = [];
        recursiveArray[0] = recursiveArray;

        const shallow = cloneDeep(recursiveArray);
        expect(shallow).toEqual(recursiveArray);
        expect(shallow).not.toBe(recursiveArray);
    });

    interface RecursiveObject1 {
        a: string;
        quote?: RecursiveObject2;
    }

    interface RecursiveObject2 {
        b: string;
        quote?: RecursiveObject1;
    }

    test('cloneDeep 循环引用对象', () => {
        const recursiveObject1: RecursiveObject1 = { a: 'a' };
        const recursiveObject2: RecursiveObject2 = { b: 'b' };
        recursiveObject1.quote = recursiveObject2;
        recursiveObject2.quote = recursiveObject1;

        const shallow = cloneDeep(recursiveObject1);
        expect(shallow).toEqual(recursiveObject1);
        expect(shallow).not.toBe(recursiveObject1);
        expect(shallow.quote).not.toBe(recursiveObject1.quote);
    });

    test('cloneDeep(new Set([ { a: 1, b: 1 }, { a: 2, b: 2 } ]))', () => {
        const set = new Set([
            { a: 1, b: 1 },
            { a: 2, b: 2 },
        ]);
        const shallow = cloneDeep(set);
        expect(shallow).toEqual(set);
        expect(shallow).not.toBe(set);
    });

    test('cloneDeep(new RegExp(".+", "ig"))', () => {
        const regexp = new RegExp('.+', 'ig');
        const shallow = cloneDeep(regexp);
        expect(shallow).toEqual(regexp);
        expect(shallow).not.toBe(regexp);
    });

    test('cloneDeep(new Date())', () => {
        const date = new Date();
        const shallow = cloneDeep(date);
        expect(shallow).toEqual(date);
        expect(shallow).not.toBe(date);
    });

    test('cloneDeep(new String())', () => {
        const str = new String();
        const shallow = cloneDeep(str);
        expect(shallow).toEqual(str);
        expect(shallow).not.toBe(str);
    });

    test('cloneDeep(new Boolean(true))', () => {
        const bool = new Boolean(true);
        const shallow = cloneDeep(bool);
        expect(shallow).toEqual(bool);
        expect(shallow).not.toBe(bool);
    });

    test('cloneDeep(new Number(0))', () => {
        const num = new Number(0);
        const shallow = cloneDeep(num);
        expect(shallow).toEqual(num);
        expect(shallow).not.toBe(num);
    });

    test('cloneDeep(Object(Symbol(0)))', () => {
        const SYMBOL_ZERO = Object(Symbol(0));
        const shallow = cloneDeep(SYMBOL_ZERO);
        expect(shallow).toEqual(SYMBOL_ZERO);
        expect(shallow).not.toBe(SYMBOL_ZERO);
    });
});

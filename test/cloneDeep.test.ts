import cloneDeep from '../source/cloneDeep';

const objects = [{ a: 1 }, { b: 2 }];

test('cloneDeep([{ a: 1 }, { b: 2 }])', () => {
    const shallow = cloneDeep(objects);
    expect(shallow).toEqual(objects);
    expect(shallow).not.toBe(objects);
    expect(shallow[0]).not.toBe(objects[0]);
});

interface RecursiveArray extends Array<RecursiveArray> {}

const recursiveArray: RecursiveArray = [];

test('cloneDeep 循环引用数组', () => {
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

const recursiveObject1: RecursiveObject1 = { a: 'a' };
const recursiveObject2: RecursiveObject2 = { b: 'b' };

recursiveObject1.quote = recursiveObject2;
recursiveObject2.quote = recursiveObject1;

test('cloneDeep 循环引用对象', () => {
    const shallow = cloneDeep(recursiveObject1);
    expect(shallow).toEqual(recursiveObject1);
    expect(shallow).not.toBe(recursiveObject1);
    expect(shallow.quote).not.toBe(recursiveObject1.quote);
});

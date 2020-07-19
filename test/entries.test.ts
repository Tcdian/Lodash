import { entries } from '../source/object/entries';
import { create } from '../source/object/create';

let object: { a: number; b: number };
let set: Set<number>;
let map: Map<string, number>;

beforeAll(() => {
    object = create({ a: 1 }, { b: 2 });
    set = new Set([1, 2]);
    map = new Map([['a', 1]]);
});

test('entries(create({ a: 1 }, { b: 2 })', () => {
    expect(entries(object)).toEqual([['b', 2]]);
});

test('entries(new Set([1, 2]))', () => {
    expect(entries(set)).toEqual([
        [1, 1],
        [2, 2],
    ]);
});

test("entries(new Map([['a', 1]]))", () => {
    expect(entries(map)).toEqual([['a', 1]]);
});

import { entriesIn } from '../source/object/entriesIn';
import { create } from '../source/object/create';

let object: { a: number; b: number };
let set: Set<number>;
let map: Map<string, number>;

beforeAll(() => {
    object = create({ a: 1 }, { b: 2 });
    set = new Set([1, 2]);
    map = new Map([['a', 1]]);
});

test('entriesIn(create({ a: 1 }, { b: 2 }))', () => {
    expect(entriesIn(object)).toEqual([
        ['b', 2],
        ['a', 1],
    ]);
});

test('entriesIn(new Set([1, 2]))', () => {
    expect(entriesIn(set)).toEqual([
        [1, 1],
        [2, 2],
    ]);
});

test("entriesIn(new Map([['a', 1]]))", () => {
    expect(entriesIn(map)).toEqual([['a', 1]]);
});

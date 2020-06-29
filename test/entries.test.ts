import _ from 'lodash';
import { create, entries } from '../source/object';

let object: { a: number; b: number };
let set: Set<number>;
let map: Map<string, number>;

beforeAll(() => {
    object = create({ a: 1 }, { b: 2 });
    set = new Set([1, 2]);
    map = new Map([['a', 1]]);
});

test('entries(create({ a: 1 }, { b: 2 })', () => {
    expect(entries(object)).toEqual(_.entries(object));
});

test('entries(new Set([1, 2]))', () => {
    expect(entries(set)).toEqual(_.entries(set));
});

test("entries(new Map([['a', 1]]))", () => {
    expect(entries(map)).toEqual(_.entries(map));
});

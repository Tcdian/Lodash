import _ from 'lodash';
import { assign } from '../source/object/assign';
import { create } from '../source/object/create';

let foo: { a: number; b: number };
let bar: { c: number; d: number };

beforeEach(() => {
    foo = create({ b: 2 }, { a: 1 });
    bar = create({ d: 4 }, { c: 3 });
});

test('assign({ a: 0 }, create({ b: 2 }, { a: 1 }))', () => {
    expect(assign({ a: 0 }, foo)).toEqual(_.assign({ a: 0 }, foo));
});

test('assign({ a: 0 }, create({ d: 4 }, { c: 3 }))', () => {
    expect(assign({ a: 0 }, bar)).toEqual(_.assign({ a: 0 }, bar));
});

test('assign({ a: 0 }, create({ b: 2 }, { a: 1 }), create({ d: 4 }, { c: 3 }))', () => {
    expect(assign({ a: 0 }, foo, bar)).toEqual(_.assign({ a: 0 }, foo, bar));
});

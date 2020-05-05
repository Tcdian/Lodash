import _ from 'lodash';
import create from '../source/create';
import assign from '../source/assign';

let foo: { a: number; b: number };
let bar: { c: number; d: number };

beforeEach(() => {
    foo = create({ b: 2 }, { a: 1 });
    bar = create({ d: 4 }, { c: 3 });
});

test('assign', () => {
    expect(assign({ a: 0 }, foo)).toEqual(_.assign({ a: 0 }, foo));
});

test('assign', () => {
    expect(assign({ a: 0 }, bar)).toEqual(_.assign({ a: 0 }, bar));
});

test('assign', () => {
    expect(assign({ a: 0 }, foo, bar)).toEqual(_.assign({ a: 0 }, foo, bar));
});

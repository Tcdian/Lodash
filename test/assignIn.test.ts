import _ from 'lodash';
import create from '../source/create';
import assignIn from '../source/assignIn';

let foo: { a: number; b: number };
let bar: { c: number; d: number };

beforeEach(() => {
    foo = create({ b: 2 }, { a: 1 });
    bar = create({ d: 4 }, { c: 3 });
});

test('assignIn({ a: 0 }, create({ b: 2 }, { a: 1 }))', () => {
    expect(assignIn({ a: 0 }, foo)).toEqual(_.assignIn({ a: 0 }, foo));
});

test('assignIn({ a: 0 }, create({ d: 4 }, { c: 3 }))', () => {
    expect(assignIn({ a: 0 }, bar)).toEqual(_.assignIn({ a: 0 }, bar));
});

test('assignIn({ a: 0 }, create({ b: 2 }, { a: 1 }), create({ d: 4 }, { c: 3 }))', () => {
    expect(assignIn({ a: 0 }, foo, bar)).toEqual(_.assignIn({ a: 0 }, foo, bar));
});

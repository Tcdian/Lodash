import _ from 'lodash';
import create from '../source/create';
import assignIn from '../source/assignIn';

let source1: { a: number; b: number };
let source2: { c: number; d: number };

beforeEach(() => {
    source1 = create({ b: 2 }, { a: 1 });
    source2 = create({ d: 4 }, { c: 3 });
});

test('assignIn({ a: 0 }, create({ b: 2 }, { a: 1 }))', () => {
    expect(assignIn({ a: 0 }, source1)).toEqual(_.assignIn({ a: 0 }, source1));
});

test('assignIn({ a: 0 }, create({ d: 4 }, { c: 3 }))', () => {
    expect(assignIn({ a: 0 }, source2)).toEqual(_.assignIn({ a: 0 }, source2));
});

test('assignIn({ a: 0 }, create({ b: 2 }, { a: 1 }), create({ d: 4 }, { c: 3 }))', () => {
    expect(assignIn({ a: 0 }, source1, source2)).toEqual(_.assignIn({ a: 0 }, source1, source2));
});

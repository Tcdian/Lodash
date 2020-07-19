import { hasIn } from '../source/object/hasIn';
import { create } from '../source/object/create';

const object = { a: { b: 2 } };
const other = create({ a: create({ b: 2 }) });

test(`hasIn({ a: { b: 2 } }, 'a') => ${hasIn(object, 'a')}`, () => {
    expect(hasIn(object, 'a')).toBe(true);
});

test(`hasIn({ a: { b: 2 } }, 'a.b') => ${hasIn(object, 'a.b')}`, () => {
    expect(hasIn(object, 'a.b')).toBe(true);
});

test(`hasIn({ a: { b: 2 } }, ['a', 'b']) => ${hasIn(object, ['a', 'b'])}`, () => {
    expect(hasIn(object, ['a', 'b'])).toBe(true);
});

test(`hasIn(create({ a: create({ b: 2 }) }), 'a') => ${hasIn(other, 'a')}`, () => {
    expect(hasIn(other, 'a')).toBe(true);
});

test(`hasIn(create({ a: create({ b: 2 }) }), 'a.b') => ${hasIn(other, 'a.b')}`, () => {
    expect(hasIn(other, 'a.b')).toBe(true);
});

test(`hasIn(create({ a: create({ b: 2 }) }), ['a', 'b']) => ${hasIn(other, ['a', 'b'])}`, () => {
    expect(hasIn(other, ['a', 'b'])).toBe(true);
});

test(`hasIn(create({ a: create({ b: 2 }) }), 'b') => ${hasIn(other, 'b')}`, () => {
    expect(hasIn(other, 'b')).toBe(false);
});

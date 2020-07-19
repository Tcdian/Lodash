import { has } from '../source/object/has';
import { create } from '../source/object/create';

const object = { a: { b: 2 } };
const other = create({ a: create({ b: 2 }) });

test(`has({ a: { b: 2 } }, 'a') => ${has(object, 'a')}`, () => {
    expect(has(object, 'a')).toBe(true);
});

test(`has({ a: { b: 2 } }, 'a.b') => ${has(object, 'a.b')}`, () => {
    expect(has(object, 'a.b')).toBe(true);
});

test(`has({ a: { b: 2 } }, ['a', 'b']) => ${has(object, ['a', 'b'])}`, () => {
    expect(has(object, ['a', 'b'])).toBe(true);
});

test(`has(create({ a: create({ b: 2 }) }), 'a') => ${has(other, 'a')}`, () => {
    expect(has(other, 'a')).toBe(false);
});

import _ from 'lodash';
import { create, has } from '../source/object';

const object = { a: { b: 2 } };
const other = create({ a: create({ b: 2 }) });

test(`has({ a: { b: 2 } }, 'a') => ${has(object, 'a')}`, () => {
    expect(has(object, 'a')).toBe(_.has(object, 'a'));
});

test(`has({ a: { b: 2 } }, 'a.b') => ${has(object, 'a.b')}`, () => {
    expect(has(object, 'a.b')).toBe(_.has(object, 'a.b'));
});

test(`has({ a: { b: 2 } }, ['a', 'b']) => ${has(object, ['a', 'b'])}`, () => {
    expect(has(object, ['a', 'b'])).toBe(_.has(object, ['a', 'b']));
});

test(`has(create({ a: create({ b: 2 }) }), 'a') => ${has(other, 'a')}`, () => {
    expect(has(other, 'a')).toBe(_.has(other, 'a'));
});

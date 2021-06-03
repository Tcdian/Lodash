import { has } from '../source/object/has';
import { create } from '../source/object/create';

describe('has', () => {
    const object = { a: { b: 2 } };
    const other = create({ a: create({ b: 2 }) });

    test('has({ a: { b: 2 } }, "a") => true', () => {
        expect(has(object, 'a')).toBe(true);
    });

    test('has({ a: { b: 2 } }, "a.b") => true', () => {
        expect(has(object, 'a.b')).toBe(true);
    });

    test('has({ a: { b: 2 } }, ["a", "b"]) => true', () => {
        expect(has(object, ['a', 'b'])).toBe(true);
    });

    test('has(create({ a: create({ b: 2 }) }), "a") => false', () => {
        expect(has(other, 'a')).toBe(false);
    });
});

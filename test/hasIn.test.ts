import { hasIn } from '../source/object/hasIn';
import { create } from '../source/object/create';

describe('hasIn', () => {
    const object = { a: { b: 2 } };
    const other = create({ a: create({ b: 2 }) });

    test('hasIn({ a: { b: 2 } }, "a") => true', () => {
        expect(hasIn(object, 'a')).toBe(true);
    });

    test('hasIn({ a: { b: 2 } }, "a.b") => true', () => {
        expect(hasIn(object, 'a.b')).toBe(true);
    });

    test('hasIn({ a: { b: 2 } }, ["a", "b"]) => true', () => {
        expect(hasIn(object, ['a', 'b'])).toBe(true);
    });

    test('hasIn(create({ a: create({ b: 2 }) }), "a") => true', () => {
        expect(hasIn(other, 'a')).toBe(true);
    });

    test('hasIn(create({ a: create({ b: 2 }) }), "a.b") => true', () => {
        expect(hasIn(other, 'a.b')).toBe(true);
    });

    test('hasIn(create({ a: create({ b: 2 }) }), ["a", "b"]) => true', () => {
        expect(hasIn(other, ['a', 'b'])).toBe(true);
    });

    test('hasIn(create({ a: create({ b: 2 }) }), "b") => true', () => {
        expect(hasIn(other, 'b')).toBe(false);
    });
});

import { unset } from '../source/object/unset';

describe('unset', () => {
    test('string path', () => {
        const object = { a: [{ b: { c: 7 } }] };
        expect(unset(object, 'a[0].b.c')).toBe(true);
        expect(object).toEqual({ a: [{ b: {} }] });
    });

    test('array path', () => {
        const object = { a: [{ b: { c: 7 } }] };
        expect(unset(object, ['a', '0', 'b', 'c'])).toBe(true);
        expect(object).toEqual({ a: [{ b: {} }] });
    });
});

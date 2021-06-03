import { get } from '../source/object/get';

describe('get', () => {
    const object = { a: [{ b: { c: 3 } }] };

    test('get(object, "a[0].b.c") => 3', () => {
        expect(get(object, 'a[0].b.c')).toEqual(3);
    });

    test('get(object, ["a", "0", "b", "c"]) => 3', () => {
        expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
    });

    test('get(object, "a.b.c", "default") => "default"', () => {
        expect(get(object, 'a.b.c', 'default')).toEqual('default');
    });
});

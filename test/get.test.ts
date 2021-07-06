import { get } from '../source/object/get';

describe('get', () => {
    const object = { a: [{ b: { c: 3 } }] };

    test('string path', () => {
        expect(get(object, 'a[0].b.c')).toEqual(3);
    });

    test('array path', () => {
        expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
    });

    test('with default value', () => {
        expect(get(object, 'a.b.c', 'default')).toEqual('default');
    });
});

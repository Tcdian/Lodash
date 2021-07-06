import { set } from '../source/object/set';

describe('set', () => {
    const object: any = { a: [{ b: { c: 3 } }] };

    test('string path', () => {
        set(object, 'a[0].b.c', 1);
        expect(object.a[0].b.c).toBe(1);
    });

    test('array path', () => {
        set(object, ['x', '0', 'y', 'z'], 5);
        expect(object.x[0].y.z).toBe(5);
    });
});

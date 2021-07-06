import { update } from '../source/object/update';

describe('update', () => {
    const object: any = { a: [{ b: { c: 3 } }] };

    test('update existing property', () => {
        update(object, 'a[0].b.c', (n) => n * n);
        expect(object.a[0].b.c).toBe(9);
    });

    test('update non-existent property', () => {
        update(object, 'x[0].y.z', function (n) {
            return n ? n + 1 : 0;
        });
        expect(object.x[0].y.z).toBe(0);
    });
});

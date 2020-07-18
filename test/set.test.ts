import { set } from '../source/object/set';

let object: any = { a: [{ b: { c: 3 } }] };

test("set(object, 'a[0].b.c', 1)", () => {
    set(object, 'a[0].b.c', 1);
    expect(object.a[0].b.c).toBe(1);
});

test("set(object, ['x', '0', 'y', 'z'], 5)", () => {
    set(object, ['x', '0', 'y', 'z'], 5);
    expect(object.x[0].y.z).toBe(5);
});

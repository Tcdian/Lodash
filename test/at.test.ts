import { at } from '../source/object/at';

const object = { a: [{ b: { c: 3 } }, 4] };

test(`at(object, ['a[0].b.c', 'a[1]']) => ${at(object, ['a[0].b.c', 'a[1]'])}`, () => {
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
});

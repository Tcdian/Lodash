import { get } from '../source/object/get';

const object = { a: [{ b: { c: 3 } }] };

test(`get(object, 'a[0].b.c') => ${get(object, 'a[0].b.c')}`, () => {
    expect(get(object, 'a[0].b.c')).toEqual(3);
});

test(`get(object, ['a', '0', 'b', 'c']) => ${get(object, ['a', '0', 'b', 'c'])}`, () => {
    expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
});

test(`get(object, 'a.b.c', 'default') => ${get(object, 'a.b.c', 'default')}`, () => {
    expect(get(object, 'a.b.c', 'default')).toEqual('default');
});

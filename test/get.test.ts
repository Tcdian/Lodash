import _ from 'lodash';
import { get } from '../source/object';

const object = { a: [{ b: { c: 3 } }] };

test(`get(object, 'a[0].b.c') => ${get(object, 'a[0].b.c')}`, () => {
    expect(get(object, 'a[0].b.c')).toEqual(_.get(object, 'a[0].b.c'));
});

test(`get(object, ['a', '0', 'b', 'c']) => ${get(object, ['a', '0', 'b', 'c'])}`, () => {
    expect(get(object, ['a', '0', 'b', 'c'])).toEqual(_.get(object, ['a', '0', 'b', 'c']));
});

test(`get(object, 'a.b.c', 'default') => ${get(object, 'a.b.c', 'default')}`, () => {
    expect(get(object, 'a.b.c', 'default')).toEqual(_.get(object, 'a.b.c', 'default'));
});

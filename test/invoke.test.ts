import _ from 'lodash';
import { invoke } from '../source/object';

const object = { a: [{ b: { c: [1, 2, 3, 4] } }] };

test(`invoke({ a: [{ b: { c: [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', 1, 3) => ${invoke(
    object,
    'a[0].b.c.slice',
    1,
    3
)}`, () => {
    expect(invoke(object, 'a[0].b.c.slice', 1, 3)).toEqual(_.invoke(object, 'a[0].b.c.slice', 1, 3));
});

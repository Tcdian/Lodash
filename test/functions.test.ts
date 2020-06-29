import _ from 'lodash';
import { create, functions } from '../source/object';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functions(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functions(object)}`, () => {
    expect(functions(object)).toEqual(_.functions(object));
});

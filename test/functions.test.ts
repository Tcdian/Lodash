import _ from 'lodash';
import { functions } from '../source/object/functions';
import { create } from '../source/object/create';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functions(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functions(object)}`, () => {
    expect(functions(object)).toEqual(_.functions(object));
});

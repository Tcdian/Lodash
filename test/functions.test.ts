import _ from 'lodash';
import create from '../source/create';
import functions from '../source/functions';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functions(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functions(object)}`, () => {
    expect(functions(object)).toEqual(_.functions(object));
});

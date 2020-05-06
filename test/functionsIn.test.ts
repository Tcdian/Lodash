import _ from 'lodash';
import create from '../source/create';
import functionsIn from '../source/functionsIn';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functionsIn(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functionsIn(object)}`, () => {
    expect(functionsIn(object)).toEqual(_.functionsIn(object));
});

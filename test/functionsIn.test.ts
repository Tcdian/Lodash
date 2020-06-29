import _ from 'lodash';
import { create, functionsIn } from '../source/object';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functionsIn(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functionsIn(object)}`, () => {
    expect(functionsIn(object)).toEqual(_.functionsIn(object));
});

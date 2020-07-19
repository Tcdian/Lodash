import { functionsIn } from '../source/object/functionsIn';
import { create } from '../source/object/create';

const object = create({ a: () => {} }, { b: () => {}, c: 'c' });

test(`functionsIn(create({ a: () => {} }, { b: () => {}, c: 'c' })) => ${functionsIn(object)}`, () => {
    expect(functionsIn(object)).toEqual(['b', 'a']);
});

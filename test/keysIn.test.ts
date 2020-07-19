import { keysIn } from '../source/object/keysIn';
import { create } from '../source/object/create';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`keysIn(create({ a: 1 }, { b: 2, c: 3 })) => ${keysIn(object)}`, () => {
    expect(keysIn(object)).toEqual(['b', 'c', 'a']);
});

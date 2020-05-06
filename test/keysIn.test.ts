import _ from 'lodash';
import create from '../source/create';
import keysIn from '../source/keysIn';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`keysIn(create({ a: 1 }, { b: 2, c: 3 })) => ${keysIn(object)}`, () => {
    expect(keysIn(object)).toEqual(_.keysIn(object));
});

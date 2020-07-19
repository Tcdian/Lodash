import { keys } from '../source/object/keys';
import { create } from '../source/object/create';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`keys(create({ a: 1 }, { b: 2, c: 3 })) => ${keys(object)}`, () => {
    expect(keys(object)).toEqual(['b', 'c']);
});

test(`keys('hi') => ${keys('hi')}`, () => {
    expect(keys('hi')).toEqual(['0', '1']);
});

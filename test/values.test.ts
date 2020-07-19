import { values } from '../source/object/values';
import { create } from '../source/object/create';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`values(create({ a: 1 }, { b: 2, c: 3 })) => ${values(object)}`, () => {
    expect(values(object)).toEqual([2, 3]);
});

test(`values('hi') => ${values('hi')}`, () => {
    expect(values('hi')).toEqual(['h', 'i']);
});

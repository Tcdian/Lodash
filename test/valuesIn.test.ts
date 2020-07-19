import { valuesIn } from '../source/object/valuesIn';
import { create } from '../source/object/create';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`valuesIn(create({ a: 1 }, { b: 2, c: 3 })) => ${valuesIn(object)}`, () => {
    expect(valuesIn(object)).toEqual([2, 3, 1]);
});

test(`valuesIn('hi') => ${valuesIn('hi')}`, () => {
    expect(valuesIn('hi')).toEqual(['h', 'i']);
});

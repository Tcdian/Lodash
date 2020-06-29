import _ from 'lodash';
import { create, valuesIn } from '../source/object';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`valuesIn(create({ a: 1 }, { b: 2, c: 3 })) => ${valuesIn(object)}`, () => {
    expect(valuesIn(object)).toEqual(_.valuesIn(object));
});

test(`valuesIn('hi') => ${valuesIn('hi')}`, () => {
    expect(valuesIn('hi')).toEqual(_.valuesIn('hi'));
});

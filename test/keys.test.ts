import _ from 'lodash';
import create from '../source/create';
import keys from '../source/keys';

const object = create({ a: 1 }, { b: 2, c: 3 });

test(`keys(create({ a: 1 }, { b: 2, c: 3 })) => ${keys(object)}`, () => {
    expect(keys(object)).toEqual(_.keys(object));
});

test(`keys('hi') => ${keys('hi')}`, () => {
    expect(keys('hi')).toEqual(_.keys('hi'));
});

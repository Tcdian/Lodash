import _ from 'lodash';
import create from '../source/create';

test(`create({}) => ${create({})}`, () => {
    expect(create({})).toEqual(_.create({}));
});

test(`create({}, { a: 1 }) => ${create({}, { a: 1 })}`, () => {
    expect(create({}, { a: 1 })).toEqual(_.create({}, { a: 1 }));
});

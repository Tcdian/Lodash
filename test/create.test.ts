import { create } from '../source/object/create';

test(`create({}) => ${create({})}`, () => {
    expect(create({})).toEqual({});
});

test(`create({}, { a: 1 }) => ${create({}, { a: 1 })}`, () => {
    expect(create({}, { a: 1 })).toEqual({ a: 1 });
});

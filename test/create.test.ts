import { create } from '../source/object/create';

describe('create', () => {
    test('create({}) => {}', () => {
        expect(create({})).toEqual({});
    });

    test('create({}, { a: 1 }) => { a: 1 }', () => {
        expect(create({}, { a: 1 })).toEqual({ a: 1 });
    });
});

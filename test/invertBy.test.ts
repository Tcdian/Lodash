import { invertBy } from '../source/object/invertBy';

describe('invertBy', () => {
    const object = { a: 1, b: 2, c: 1 };

    test('identity', () => {
        expect(invertBy(object)).toEqual({ '1': ['a', 'c'], '2': ['b'] });
    });

    test('iterator', () => {
        expect(invertBy(object, (value) => 'group' + value)).toEqual({ group1: ['a', 'c'], group2: ['b'] });
    });
});

import { mapValues } from '../source/object/mapValues';

describe('mapValues', () => {
    const users = {
        fred: { user: 'fred', age: 40 },
        pebbles: { user: 'pebbles', age: 1 },
    };

    test('iterator', () => {
        expect(mapValues(users, (user) => user.age)).toEqual({ fred: 40, pebbles: 1 });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(mapValues(users, 'age')).toEqual({ fred: 40, pebbles: 1 });
    });
});

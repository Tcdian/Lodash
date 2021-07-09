import { sortBy } from '../source/collection/sortBy';

describe('sortBy', () => {
    const users = [
        { user: 'fred', age: 48 },
        { user: 'barney', age: 36 },
        { user: 'fred', age: 40 },
        { user: 'barney', age: 34 },
    ];

    test('iterator', () => {
        expect(sortBy(users, [(o) => o.user])).toEqual([
            { user: 'barney', age: 36 },
            { user: 'barney', age: 34 },
            { user: 'fred', age: 48 },
            { user: 'fred', age: 40 },
        ]);
        expect(sortBy(users, (o) => o.user)).toEqual([
            { user: 'barney', age: 36 },
            { user: 'barney', age: 34 },
            { user: 'fred', age: 48 },
            { user: 'fred', age: 40 },
        ]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(sortBy(users, ['user', 'age'])).toEqual([
            { user: 'barney', age: 34 },
            { user: 'barney', age: 36 },
            { user: 'fred', age: 40 },
            { user: 'fred', age: 48 },
        ]);
    });
});

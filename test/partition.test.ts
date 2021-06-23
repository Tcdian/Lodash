import { partition } from '../source/collection/partition';

describe('partition', () => {
    const users = [
        { user: 'barney', age: 36, active: false },
        { user: 'fred', age: 40, active: true },
        { user: 'pebbles', age: 1, active: false },
    ];

    test('iterator', () => {
        expect(partition(users, (user) => user.active)).toEqual([
            [{ user: 'fred', age: 40, active: true }],
            [
                { user: 'barney', age: 36, active: false },
                { user: 'pebbles', age: 1, active: false },
            ],
        ]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(partition(users, { age: 1, active: false })).toEqual([
            [{ user: 'pebbles', age: 1, active: false }],
            [
                { user: 'barney', age: 36, active: false },
                { user: 'fred', age: 40, active: true },
            ],
        ]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(partition(users, ['active', false])).toEqual([
            [
                { user: 'barney', age: 36, active: false },
                { user: 'pebbles', age: 1, active: false },
            ],
            [{ user: 'fred', age: 40, active: true }],
        ]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(partition(users, 'active')).toEqual([
            [{ user: 'fred', age: 40, active: true }],
            [
                { user: 'barney', age: 36, active: false },
                { user: 'pebbles', age: 1, active: false },
            ],
        ]);
    });
});

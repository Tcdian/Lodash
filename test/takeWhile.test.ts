import { takeWhile } from '../source/array/takeWhile';

describe('takeWhile', () => {
    const users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true },
    ];

    test('takeWhile iterator', () => {
        expect(takeWhile(users, (user) => !user.active)).toEqual([
            { user: 'barney', active: false },
            { user: 'fred', active: false },
        ]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(takeWhile(users, { user: 'barney', active: false })).toEqual([{ user: 'barney', active: false }]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(takeWhile(users, ['active', false])).toEqual([
            { user: 'barney', active: false },
            { user: 'fred', active: false },
        ]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(takeWhile(users, 'active')).toEqual([]);
    });
});

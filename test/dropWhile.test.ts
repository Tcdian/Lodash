import { dropWhile } from '../source/array/dropWhile';

describe('dropWhile', () => {
    const users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true },
    ];

    test('iterator', () => {
        expect(dropWhile(users, (user) => !user.active)).toEqual([{ user: 'pebbles', active: true }]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(dropWhile(users, { user: 'barney', active: false })).toEqual([
            { user: 'fred', active: false },
            { user: 'pebbles', active: true },
        ]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(dropWhile(users, ['active', false])).toEqual([{ user: 'pebbles', active: true }]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(dropWhile(users, 'active')).toEqual([
            { user: 'barney', active: false },
            { user: 'fred', active: false },
            { user: 'pebbles', active: true },
        ]);
    });
});

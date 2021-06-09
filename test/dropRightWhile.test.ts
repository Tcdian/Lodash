import { dropRightWhile } from '../source/array/dropRightWhile';

describe('dropWhile', () => {
    const users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false },
    ];

    test('dropWhile iterator', () => {
        expect(dropRightWhile(users, (user) => !user.active)).toEqual([{ user: 'barney', active: true }]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(dropRightWhile(users, { user: 'pebbles', active: false })).toEqual([
            { user: 'barney', active: true },
            { user: 'fred', active: false },
        ]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(dropRightWhile(users, ['active', false])).toEqual([{ user: 'barney', active: true }]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(dropRightWhile(users, 'active')).toEqual([
            { user: 'barney', active: true },
            { user: 'fred', active: false },
            { user: 'pebbles', active: false },
        ]);
    });
});

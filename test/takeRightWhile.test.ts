import { takeRightWhile } from '../source/array/takeRightWhile';

describe('takeRightWhile', () => {
    const users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false },
    ];

    test('takeRightWhile iterator', () => {
        expect(takeRightWhile(users, (user) => !user.active)).toEqual([
            { user: 'fred', active: false },
            { user: 'pebbles', active: false },
        ]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(takeRightWhile(users, { user: 'pebbles', active: false })).toEqual([{ user: 'pebbles', active: false }]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(takeRightWhile(users, ['active', false])).toEqual([
            { user: 'fred', active: false },
            { user: 'pebbles', active: false },
        ]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(takeRightWhile(users, 'active')).toEqual([]);
    });
});

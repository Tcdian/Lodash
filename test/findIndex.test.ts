import { findIndex } from '../source/array/findIndex';

describe('findIndex', () => {
    const users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true },
    ];

    test('findIndex iterator', () => {
        expect(findIndex(users, (user) => user.user == 'barney')).toBe(0);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(findIndex(users, { user: 'fred', active: false })).toBe(1);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(findIndex(users, ['active', false])).toBe(0);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(findIndex(users, 'active')).toBe(2);
    });
});

import { findLastIndex } from '../source/array/findLastIndex';

describe('findLastIndex', () => {
    const users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false },
    ];

    test('findLastIndex iterator', () => {
        expect(findLastIndex(users, (user) => user.user === 'pebbles')).toBe(2);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(findLastIndex(users, { user: 'barney', active: true })).toBe(0);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(findLastIndex(users, ['active', false])).toBe(2);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(findLastIndex(users, 'active')).toBe(0);
    });
});

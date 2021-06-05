import { findLast } from '../source/collection/findLast';

describe('findLast', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
        { user: 'pebbles', age: 1, active: true },
    ];

    test('iterator', () => {
        expect(findLast(users, (user) => user.age < 40)).toEqual({ user: 'pebbles', age: 1, active: true });
        expect(findLast(users, (user) => user.age > 60)).toBe(undefined);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(findLast(users, { age: 1, active: true })).toEqual({ user: 'pebbles', age: 1, active: true });
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(findLast(users, ['active', false])).toEqual({ user: 'fred', age: 40, active: false });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(findLast(users, 'active')).toEqual({ user: 'pebbles', age: 1, active: true });
    });
});

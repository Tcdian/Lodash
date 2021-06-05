import { find } from '../source/collection/find';

describe('find', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
        { user: 'pebbles', age: 1, active: true },
    ];

    test('iterator', () => {
        expect(find(users, (user) => user.age < 40)).toEqual({ user: 'barney', age: 36, active: true });
        expect(find(users, (user) => user.age > 60)).toBe(undefined);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(find(users, { age: 1, active: true })).toEqual({ user: 'pebbles', age: 1, active: true });
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(find(users, ['active', false])).toEqual({ user: 'fred', age: 40, active: false });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(find(users, 'active')).toEqual({ user: 'barney', age: 36, active: true });
    });
});

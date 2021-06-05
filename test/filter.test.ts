import { filter } from '../source/collection/filter';

describe('filter', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
    ];

    test('iterator', () => {
        expect(filter(users, (user) => !user.active)).toEqual([{ user: 'fred', age: 40, active: false }]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(filter(users, { age: 36, active: true })).toEqual([{ user: 'barney', age: 36, active: true }]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(filter(users, ['active', false])).toEqual([{ user: 'fred', age: 40, active: false }]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(filter(users, 'active')).toEqual([{ user: 'barney', age: 36, active: true }]);
    });
});

import { reject } from '../source/collection/reject';

describe('reject', () => {
    const users = [
        { user: 'barney', age: 36, active: false },
        { user: 'fred', age: 40, active: true },
    ];

    test('iterator', () => {
        expect(reject(users, (user) => !user.active)).toEqual([{ user: 'fred', age: 40, active: true }]);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(reject(users, { age: 40, active: true })).toEqual([{ user: 'barney', age: 36, active: false }]);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(reject(users, ['active', false])).toEqual([{ user: 'fred', age: 40, active: true }]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(reject(users, 'active')).toEqual([{ user: 'barney', age: 36, active: false }]);
    });
});

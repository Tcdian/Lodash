import { every } from '../source/collection/every';

describe('every', () => {
    const users = [
        { user: 'barney', age: 36, active: false },
        { user: 'fred', age: 40, active: false },
    ];

    test('iterator', () => {
        expect(every([true, 1, null, 'yes'], Boolean)).toBe(false);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(every(users, { user: 'barney', active: false })).toBe(false);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(every(users, ['active', false])).toBe(true);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(every(users, 'active')).toBe(false);
    });
});

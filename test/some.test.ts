import { some } from '../source/collection/some';

describe('some', () => {
    const users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
    ];

    test('iterator', () => {
        expect(some([true, 1, null, 'yes'], Boolean)).toBe(true);
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(some(users, { user: 'barney', active: false })).toBe(false);
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(some(users, ['active', false])).toBe(true);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(some(users, 'active')).toBe(true);
    });
});

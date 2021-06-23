import { findLastKey } from '../source/object/findLastKey';

describe('findLastKey', () => {
    const users = {
        barney: { age: 36, active: true },
        fred: { age: 40, active: false },
        pebbles: { age: 1, active: true },
    };

    test('iterator', () => {
        expect(findLastKey(users, (user) => user.age < 40)).toBe('pebbles');
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(findLastKey(users, { age: 36, active: true })).toBe('barney');
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(findLastKey(users, ['active', false])).toBe('fred');
    });

    test('The "property" iteratee shorthand.', () => {
        expect(findLastKey(users, 'active')).toBe('pebbles');
    });
});

import { findKey } from '../source/object/findKey';

describe('findKey', () => {
    const users = {
        barney: { age: 36, active: true },
        fred: { age: 40, active: false },
        pebbles: { age: 1, active: true },
    };

    test('iterator', () => {
        expect(findKey(users, (user) => user.age < 40)).toBe('barney');
    });

    test('The "matches" iteratee shorthand.', () => {
        expect(findKey(users, { age: 1, active: true })).toBe('pebbles');
    });

    test('The "matchesProperty" iteratee shorthand.', () => {
        expect(findKey(users, ['active', false])).toBe('fred');
    });

    test('The "property" iteratee shorthand.', () => {
        expect(findKey(users, 'active')).toBe('barney');
    });
});

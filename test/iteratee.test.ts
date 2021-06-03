import { iteratee } from '../source/util/iteratee';

describe('iteratee', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
    ];

    test('iteratee invoke with an object', () => {
        expect(users.filter(iteratee({ user: 'barney', active: true }))).toEqual([
            { user: 'barney', age: 36, active: true },
        ]);
    });

    test('iteratee invoke with an array', () => {
        expect(users.filter(iteratee(['user', 'fred']))).toEqual([{ user: 'fred', age: 40, active: false }]);
    });

    test('iteratee invoke with a property', () => {
        expect(users.map(iteratee('user'))).toEqual(['barney', 'fred']);
    });

    test('iteratee invoke with a function', () => {
        expect(['abc', 'def'].filter(iteratee((str) => /ef/.test(str)))).toEqual(['def']);
    });
});

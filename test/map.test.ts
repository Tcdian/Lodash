import { map } from '../source/collection/map';

describe('map', () => {
    function square(n: number) {
        return n * n;
    }

    const users = [{ user: 'barney' }, { user: 'fred' }];

    test('array map', () => {
        expect(map([4, 8], square)).toEqual([16, 64]);
    });

    test('object map', () => {
        expect(map({ a: 4, b: 8 }, square)).toEqual([16, 64]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(map(users, 'user')).toEqual(['barney', 'fred']);
    });
});

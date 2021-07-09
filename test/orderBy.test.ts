import { orderBy } from '../source/collection/orderBy';

describe('orderBy', () => {
    test('Sort by `user` in ascending order and by `age` in descending order.', () => {
        const users = [
            { user: 'fred', age: 48 },
            { user: 'barney', age: 34 },
            { user: 'fred', age: 40 },
            { user: 'barney', age: 36 },
        ];
        expect(orderBy(users, ['user', 'age'], ['asc', 'desc'])).toEqual([
            { user: 'barney', age: 36 },
            { user: 'barney', age: 34 },
            { user: 'fred', age: 48 },
            { user: 'fred', age: 40 },
        ]);
    });
});

import { remove } from '../source/array/remove';

describe('remove', () => {
    test('remove with iterator', () => {
        const array = [1, 2, 3, 4];
        const evens = remove(array, (n) => n % 2 == 0);
        expect(array).toEqual([1, 3]);
        expect(evens).toEqual([2, 4]);
    });
});

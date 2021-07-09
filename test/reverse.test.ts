import { reverse } from '../source/array/reverse';

describe('reverse', () => {
    test('reverse([1, 2, 3]) => [3, 2, 1]', () => {
        const array = [1, 2, 3];
        expect(reverse(array)).toEqual([3, 2, 1]);
        expect(array).toEqual([3, 2, 1]);
    });
});

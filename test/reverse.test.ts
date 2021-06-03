import { reverse } from '../source/array/reverse';

describe('reverse', () => {
    test('reverse([1, 2, 3]) => [3, 2, 1]', () => {
        const arr = [1, 2, 3];
        expect(reverse(arr)).toEqual([3, 2, 1]);
        expect(arr).toEqual([3, 2, 1]);
    });
});

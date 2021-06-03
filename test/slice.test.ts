import { slice } from '../source/array/slice';

describe('slice', () => {
    test('slice([1, 2, 3], 1) => [2, 3]', () => {
        expect(slice([1, 2, 3], 1)).toEqual([2, 3]);
    });
});

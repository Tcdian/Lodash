import { concat } from '../source/array/concat';

describe('concat', () => {
    test('concat([1], 2, [3]) => [1, 2, 3]', () => {
        expect(concat([1], 2, [3])).toEqual([1, 2, 3]);
    });
});

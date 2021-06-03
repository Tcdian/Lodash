import { zipWith } from '../source/array/zipWith';

describe('zipWith', () => {
    test('zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) { return a + b + c; }) => [111, 222]', () => {
        expect(zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)).toEqual([111, 222]);
    });
});

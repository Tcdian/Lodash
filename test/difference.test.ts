import { difference } from '../source/array/difference';

describe('difference', () => {
    test('difference([2, 1], [2, 3]) => [1]', () => {
        expect(difference([2, 1], [2, 3])).toEqual([1]);
    });
});

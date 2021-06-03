import { without } from '../source/array/without';

describe('without', () => {
    test('without([2, 1, 2, 3], 1, 2) => [3]', () => {
        expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
    });
});

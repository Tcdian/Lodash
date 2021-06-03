import { sortedUniq } from '../source/array/sortedUniq';

describe('sortedUniq', () => {
    test('sortedUniq([1, 1, 2]) => [1, 2]', () => {
        expect(sortedUniq([1, 1, 2])).toEqual([1, 2]);
    });
});

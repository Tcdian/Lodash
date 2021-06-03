import { uniq } from '../source/array/uniq';

describe('uniq', () => {
    test('uniq([2, 1, 2]) => [2, 1]', () => {
        expect(uniq([2, 1, 2])).toEqual([2, 1]);
    });
});

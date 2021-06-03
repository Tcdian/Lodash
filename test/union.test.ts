import { union } from '../source/array/union';

describe('union', () => {
    test('union([2], [1, 2]) => [2, 1]', () => {
        expect(union([2], [1, 2])).toEqual([2, 1]);
    });
});

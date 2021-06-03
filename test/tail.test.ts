import { tail } from '../source/array/tail';

describe('tail', () => {
    test('tail([1, 2, 3]) => [2, 3]', () => {
        expect(tail([1, 2, 3])).toEqual([2, 3]);
    });
});

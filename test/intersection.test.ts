import { intersection } from '../source/array/intersection';

describe('intersection', () => {
    test('intersection([2, 1], [2, 3]) => [2]', () => {
        expect(intersection([2, 1], [2, 3])).toEqual([2]);
    });
});

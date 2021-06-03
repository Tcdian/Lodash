import { pullAt } from '../source/array/pullAt';

describe('pullAt', () => {
    test('pullAt(["a", "b", "c", "d"], [1, 3]) => ["b", "d"]', () => {
        const arr = ['a', 'b', 'c', 'd'];
        expect(pullAt(arr, [1, 3])).toEqual(['b', 'd']);
        expect(arr).toEqual(['a', 'c']);
    });
});

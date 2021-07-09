import { pullAt } from '../source/array/pullAt';

describe('pullAt', () => {
    test('pullAt(["a", "b", "c", "d"], [1, 3]) => ["b", "d"]', () => {
        const array = ['a', 'b', 'c', 'd'];
        expect(pullAt(array, [1, 3])).toEqual(['b', 'd']);
        expect(array).toEqual(['a', 'c']);
    });
});

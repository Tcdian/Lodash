import { pullAll } from '../source/array/pullAll';

describe('pullAll', () => {
    test('pullAll(["a", "b", "c", "a", "b", "c"], ["a"]) => ["b", "c", "b", "c"]', () => {
        const array = ['a', 'b', 'c', 'b', 'c'];
        expect(pullAll(array, ['a'])).toEqual(['b', 'c', 'b', 'c']);
        expect(array).toEqual(['b', 'c', 'b', 'c']);
    });

    test('pullAll(["a", "b", "c", "a", "b", "c"], ["a", "c"]) => ["b", "b"]', () => {
        const array = ['a', 'b', 'c', 'b', 'c'];
        expect(pullAll(array, ['a', 'c'])).toEqual(['b', 'b']);
        expect(array).toEqual(['b', 'b']);
    });
});

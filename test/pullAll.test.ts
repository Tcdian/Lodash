import { pullAll } from '../source/array/pullAll';

describe('pullAll', () => {
    test('pullAll(["a", "b", "c", "a", "b", "c"], ["a"]) => ["b", "c", "b", "c"]', () => {
        const arr = ['a', 'b', 'c', 'b', 'c'];
        expect(pullAll(arr, ['a'])).toEqual(['b', 'c', 'b', 'c']);
        expect(arr).toEqual(['b', 'c', 'b', 'c']);
    });

    test('pullAll(["a", "b", "c", "a", "b", "c"], ["a", "c"]) => ["b", "b"]', () => {
        const arr = ['a', 'b', 'c', 'b', 'c'];
        expect(pullAll(arr, ['a', 'c'])).toEqual(['b', 'b']);
        expect(arr).toEqual(['b', 'b']);
    });
});

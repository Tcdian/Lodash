import { pull } from '../source/array/pull';

describe('pull', () => {
    test('pull(["a", "b", "c", "a", "b", "c"], "a") => ["b", "c", "b", "c"]', () => {
        const arr = ['a', 'b', 'c', 'b', 'c'];
        expect(pull(arr, 'a')).toEqual(['b', 'c', 'b', 'c']);
        expect(arr).toEqual(['b', 'c', 'b', 'c']);
    });

    test('pull(["a", "b", "c", "a", "b", "c"], "a", "c") => ["b", "b"]', () => {
        const arr = ['a', 'b', 'c', 'b', 'c'];
        expect(pull(arr, 'a', 'c')).toEqual(['b', 'b']);
        expect(arr).toEqual(['b', 'b']);
    });
});

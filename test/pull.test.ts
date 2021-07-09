import { pull } from '../source/array/pull';

describe('pull', () => {
    test('pull(["a", "b", "c", "a", "b", "c"], "a") => ["b", "c", "b", "c"]', () => {
        const array = ['a', 'b', 'c', 'b', 'c'];
        expect(pull(array, 'a')).toEqual(['b', 'c', 'b', 'c']);
        expect(array).toEqual(['b', 'c', 'b', 'c']);
    });

    test('pull(["a", "b", "c", "a", "b", "c"], "a", "c") => ["b", "b"]', () => {
        const array = ['a', 'b', 'c', 'b', 'c'];
        expect(pull(array, 'a', 'c')).toEqual(['b', 'b']);
        expect(array).toEqual(['b', 'b']);
    });
});

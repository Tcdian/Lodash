import { curry } from '../source/function/curry';

describe('curry', () => {
    function abc(a: number, b: number, c: number) {
        return [a, b, c];
    }

    const curried = curry(abc);

    test('curried(1)(2)(3) => [1, 2, 3]', () => {
        expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
    });

    test('curried(1, 2)(3) => [1, 2, 3]', () => {
        expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
    });

    test('curried(1, 2, 3) => [1, 2, 3]', () => {
        expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
    });

    test('curried(1)("_", 3)(2) => [1, 2, 3]', () => {
        expect(curried(1)('_', 3)(2)).toEqual([1, 2, 3]);
    });
});

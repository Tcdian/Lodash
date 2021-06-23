import { flatMapDepth } from '../source/collection/flatMapDepth';

describe('flatMapDepth', () => {
    function duplicate(n: number) {
        return [[[n, n]]];
    }

    test('flatten 2 times', () => {
        expect(flatMapDepth([1, 2], duplicate, 2)).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });
});

import { flatMapDepth } from '../source/collection/flatMapDepth';

describe('flatMapDepth', () => {
    function duplicate(n: number) {
        return [[[n, n]]];
    }

    test('flatMapDepth([1, 2], duplicate, 2) => [[1, 1], [2, 2]]', () => {
        expect(flatMapDepth([1, 2], duplicate, 2)).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });
});

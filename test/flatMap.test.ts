import { flatMap } from '../source/collection/flatMap';

describe('flatMap', () => {
    function duplicate(n: number) {
        return [n, n];
    }

    test('flatMap([1, 2], duplicate) => [1, 1, 2, 2]', () => {
        expect(flatMap([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
});

import { flatMap } from '../source/collection/flatMap';

describe('flatMap', () => {
    function duplicate(n: number) {
        return [n, n];
    }

    test('flatMap', () => {
        expect(flatMap([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
});

import { flatMapDeep } from '../source/collection/flatMapDeep';

describe('flatMapDeep', () => {
    function duplicate(n: number) {
        return [[[n, n]]];
    }

    test('flatMapDeep([1, 2], duplicate) => [1, 1, 2, 2]', () => {
        expect(flatMapDeep([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
});

import { flatMapDeep } from '../source/collection/flatMapDeep';

describe('flatMapDeep', () => {
    function duplicate(n: number) {
        return [[[n, n]]];
    }

    test('recursively flatten', () => {
        expect(flatMapDeep([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
});

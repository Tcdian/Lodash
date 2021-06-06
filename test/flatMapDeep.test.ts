import { flatMapDeep } from '../source/collection/flatMapDeep';

describe('flatMapDeep', () => {
    function duplicate(n: number) {
        return [[[n, n]]];
    }

    test('flatMapDeep', () => {
        expect(flatMapDeep([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
});

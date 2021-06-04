import { stubArray } from '../source/util/stubArray';
import { times } from '../source/util/times';

describe('stubArray', () => {
    test('times(2, stubArray) => [[], []]', () => {
        const arrays = times(2, stubArray);
        expect(arrays).toEqual([[], []]);
        expect(arrays[0]).not.toBe(arrays[1]);
    });
});

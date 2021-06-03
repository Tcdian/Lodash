import { zip } from '../source/array/zip';

describe('zip', () => {
    test('zip(["a", "b"], [1, 2], [true, false]) => [["a", 1, true], ["b", 2, false]]', () => {
        expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([
            ['a', 1, true],
            ['b', 2, false],
        ]);
    });
});

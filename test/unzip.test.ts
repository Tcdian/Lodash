import { unzip } from '../source/array/unzip';
import { zip } from '../source/array/zip';

describe('unzip', () => {
    test('unzip([["a", 1, true], ["b", 2, false]]) => [["a", "b"], [1, 2], [true, false]]', () => {
        const zipped = zip(['a', 'b'], [1, 2], [true, false]);
        expect(unzip(zipped)).toEqual([
            ['a', 'b'],
            [1, 2],
            [true, false],
        ]);
    });
});

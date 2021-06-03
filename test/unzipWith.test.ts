import { unzipWith } from '../source/array/unzipWith';
import { zip } from '../source/array/zip';
import { add } from '../source/math/add';

describe('unzipWith', () => {
    test('unzipWith([[1, 10, 100], [2, 20, 200]], _.add) => [3, 30, 300]', () => {
        const zipped = zip([1, 2], [10, 20], [100, 200]);
        expect(unzipWith(zipped, add)).toEqual([3, 30, 300]);
    });
});

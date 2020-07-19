import { unzipWith } from '../source/array/unzipWith';
import { zip } from '../source/array/zip';
import { add } from '../source/math/add';

const zipped = zip([1, 2], [10, 20], [100, 200]);

test(`unzipWith([[1, 10, 100], [2, 20, 200]], _.add) => ${unzipWith(zipped, add)}`, () => {
    expect(unzipWith(zipped, add)).toEqual([3, 30, 300]);
});

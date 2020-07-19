import { unzip } from '../source/array/unzip';
import { zip } from '../source/array/zip';

const zipped = zip(['a', 'b'], [1, 2], [true, false]);

test(`unzip([['a', 1, true], ['b', 2, false]]) => ${unzip(zipped)}`, () => {
    expect(unzip(zipped)).toEqual([
        ['a', 'b'],
        [1, 2],
        [true, false],
    ]);
});

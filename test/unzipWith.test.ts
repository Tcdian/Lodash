import _ from 'lodash';
import unzipWith from '../source/unzipWith';
import zip from '../source/zip';

const zipped = zip([1, 2], [10, 20], [100, 200]);

test(`unzipWith([[1, 10, 100], [2, 20, 200]], _.add) => ${unzipWith(zipped, _.add)}`, () => {
    expect(unzipWith(zipped, _.add)).toEqual(_.unzipWith(zipped, _.add));
});

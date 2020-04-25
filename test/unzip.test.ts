import _ from 'lodash';
import unzip from '../source/unzip';

const zipped = _.zip(['a', 'b'], [1, 2], [true, false]);

test(`unzip([['a', 1, true], ['b', 2, false]]) => ${unzip(zipped)}`, () => {
    expect(unzip(zipped)).toEqual(_.unzip(zipped));
});

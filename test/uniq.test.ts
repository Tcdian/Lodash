import _ from 'lodash';
import uniq from '../source/uniq';

test(`uniq([2, 1, 2]) => ${uniq([2, 1, 2])}`, () => {
    expect(uniq([2, 1, 2])).toEqual(_.uniq([2, 1, 2]));
});

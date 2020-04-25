import _ from 'lodash';
import sortedUniq from '../source/sortedUniq';

test(`sortedUniq([1, 1, 2]) => ${sortedUniq([1, 1, 2])}`, () => {
    expect(sortedUniq([1, 1, 2])).toEqual(_.sortedUniq([1, 1, 2]));
});

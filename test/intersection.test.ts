import _ from 'lodash';
import intersection from '../source/intersection';

test(`intersection([2, 1], [2, 3]) => ${intersection([2, 1], [2, 3])}`, () => {
    expect(intersection([2, 1], [2, 3])).toEqual(_.intersection([2, 1], [2, 3]));
});

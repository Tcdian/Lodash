import _ from 'lodash';
import union from '../source/union';

test(`union([2], [1, 2]) => ${union([2], [1, 2])}`, () => {
    expect(union([2], [1, 2])).toEqual(_.union([2], [1, 2]));
});

import _ from 'lodash';
import without from '../source/without';

test(`without([2, 1, 2, 3], 1, 2) => ${without([2, 1, 2, 3], 1, 2)}`, () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual(_.without([2, 1, 2, 3], 1, 2));
});

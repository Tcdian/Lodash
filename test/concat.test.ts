import _ from 'lodash';
import concat from '../source/concat';

test(`concat(array, 2, [3]) => ${concat([1], 2, [3])}`, () => {
    expect(concat([1], 2, [3])).toEqual(_.concat([1], 2, [3]));
});

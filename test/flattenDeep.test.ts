import _ from 'lodash';
import flattenDeep from '../source/flattenDeep';

test(`flattenDeep([1, [2, [3, [4]], 5]]) => ${_.flattenDeep([1, [2, [3, [4]], 5]])}`, () => {
    expect(flattenDeep([1, [2, [3, [4]], 5]])).toEqual(_.flattenDeep([1, [2, [3, [4]], 5]]));
});

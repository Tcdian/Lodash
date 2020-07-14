import _ from 'lodash';
import { slice } from '../source/array/slice';

test(`slice([1, 2, 3], 1) => ${slice([1, 2, 3], 1)}`, () => {
    expect(slice([1, 2, 3], 1)).toEqual(_.slice([1, 2, 3], 1));
});

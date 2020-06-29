import _ from 'lodash';
import { zip } from '../source/array';

test(`zip(['a', 'b'], [1, 2], [true, false]) => ${zip(['a', 'b'], [1, 2], [true, false])}`, () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual(_.zip(['a', 'b'], [1, 2], [true, false]));
});

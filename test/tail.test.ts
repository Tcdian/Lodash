import _ from 'lodash';
import { tail } from '../source/array';

test(`tail([1, 2, 3]) => ${tail([1, 2, 3])}`, () => {
    expect(tail([1, 2, 3])).toEqual(_.tail([1, 2, 3]));
});

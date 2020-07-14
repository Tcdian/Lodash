import _ from 'lodash';
import { last } from '../source/array/last';

test(`last([1, 2, 3]) => ${last([1, 2, 3])}`, () => {
    expect(last([1, 2, 3])).toEqual(_.last([1, 2, 3]));
});

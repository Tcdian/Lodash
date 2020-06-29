import _ from 'lodash';
import { sum } from '../source/math';

test(`sum([4, 2, 8, 6]) => ${sum([4, 2, 8, 6])}`, () => {
    expect(sum([4, 2, 8, 6])).toBe(_.sum([4, 2, 8, 6]));
});

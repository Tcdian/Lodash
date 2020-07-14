import _ from 'lodash';
import { mean } from '../source/math/mean';

test(`mean([4, 2, 8, 6]) => ${mean([4, 2, 8, 6])}`, () => {
    expect(mean([4, 2, 8, 6])).toBe(_.mean([4, 2, 8, 6]));
});

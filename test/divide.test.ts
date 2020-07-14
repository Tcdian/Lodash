import _ from 'lodash';
import { divide } from '../source/math/divide';

test(`divide(6, 4) => ${divide(6, 4)}`, () => {
    expect(divide(6, 4)).toBe(_.divide(6, 4));
});

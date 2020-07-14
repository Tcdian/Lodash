import _ from 'lodash';
import { subtract } from '../source/math/subtract';

test(`subtract(6, 4) => ${subtract(6, 4)}`, () => {
    expect(subtract(6, 4)).toBe(_.subtract(6, 4));
});

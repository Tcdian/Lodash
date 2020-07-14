import _ from 'lodash';
import { ceil } from '../source/math/ceil';

test(`ceil(4.006) => ${ceil(4.006)}`, () => {
    expect(ceil(4.006)).toBe(_.ceil(4.006));
});

test(`ceil(6.004, 2) => ${ceil(6.004, 2)}`, () => {
    expect(ceil(6.004, 2)).toBe(_.ceil(6.004, 2));
});

test(`ceil(6040, -2) => ${ceil(6040, -2)}`, () => {
    expect(ceil(6040, -2)).toBe(_.ceil(6040, -2));
});

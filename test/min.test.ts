import _ from 'lodash';
import { min } from '../source/math';

test(`min([4, 2, 8, 6]) => ${min([4, 2, 8, 6])}`, () => {
    expect(min([4, 2, 8, 6])).toBe(_.min([4, 2, 8, 6]));
});

test(`min(['a', 'b', 'c']) => ${min(['a', 'b', 'c'])}`, () => {
    expect(min(['a', 'b', 'c'])).toBe(_.min(['a', 'b', 'c']));
});

test(`min([]) => ${min([])}`, () => {
    expect(min([])).toBe(_.min([]));
});

import _ from 'lodash';
import { max } from '../source/math/max';

test(`max([4, 2, 8, 6]) => ${max([4, 2, 8, 6])}`, () => {
    expect(max([4, 2, 8, 6])).toBe(_.max([4, 2, 8, 6]));
});

test(`max(['a', 'b', 'c']) => ${max(['a', 'b', 'c'])}`, () => {
    expect(max(['a', 'b', 'c'])).toBe(_.max(['a', 'b', 'c']));
});

test(`max([]) => ${max([])}`, () => {
    expect(max([])).toBe(_.max([]));
});

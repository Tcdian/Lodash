import _ from 'lodash';
import max from '../source/max';

test(`max([4, 2, 8, 6]) => ${max([4, 2, 8, 6])}`, () => {
    expect(max([4, 2, 8, 6])).toBe(_.max([4, 2, 8, 6]));
});

test(`max([]) => ${max([])}`, () => {
    expect(max([])).toBe(_.max([]));
});

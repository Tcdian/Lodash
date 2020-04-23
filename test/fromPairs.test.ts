import _ from 'lodash';
import fromPairs from '../source/fromPairs';

const pairs: [string, number][] = [
    ['a', 1],
    ['b', 2],
];

test(`fromPairs([['a', 1], ['b', 2]]) => ${_.fromPairs(pairs)}`, () => {
    expect(fromPairs(pairs)).toEqual(_.fromPairs(pairs));
});

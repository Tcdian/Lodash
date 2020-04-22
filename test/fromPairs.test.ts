import _ from 'lodash';
import fromPairs from '../source/fromPairs';

test(`fromPairs([['a', 1], ['b', 2]]) => ${_.fromPairs([
    ['a', 1],
    ['b', 2],
])}`, () => {
    expect(
        fromPairs([
            ['a', 1],
            ['b', 2],
        ])
    ).toEqual(
        _.fromPairs([
            ['a', 1],
            ['b', 2],
        ])
    );
});

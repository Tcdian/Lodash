import { fromPairs } from '../source/array/fromPairs';

const pairs: [string, number][] = [
    ['a', 1],
    ['b', 2],
];

test(`fromPairs([['a', 1], ['b', 2]]) => ${fromPairs(pairs)}`, () => {
    expect(fromPairs(pairs)).toEqual({ a: 1, b: 2 });
});

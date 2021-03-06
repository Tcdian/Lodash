import { chunk } from '../source/array/chunk';

test(`chunk(['a', 'b', 'c', 'd'], 2) => ${chunk(['a', 'b', 'c', 'd'], 2)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
        ['a', 'b'],
        ['c', 'd'],
    ]);
});

test(`chunk(['a', 'b', 'c', 'd'], 3) => ${chunk(['a', 'b', 'c', 'd'], 3)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
});

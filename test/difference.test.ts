import { difference } from '../source/array/difference';

test(`difference([2, 1], [2, 3]) => ${difference([2, 1], [2, 3])}`, () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
});

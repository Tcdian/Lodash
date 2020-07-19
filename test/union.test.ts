import { union } from '../source/array/union';

test(`union([2], [1, 2]) => ${union([2], [1, 2])}`, () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
});

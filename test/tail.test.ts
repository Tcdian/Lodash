import { tail } from '../source/array/tail';

test(`tail([1, 2, 3]) => ${tail([1, 2, 3])}`, () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
});

import { initial } from '../source/array/initial';

test(`initial([1, 2, 3]) => ${initial([1, 2, 3])}`, () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
});

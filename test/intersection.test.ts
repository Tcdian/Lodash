import { intersection } from '../source/array/intersection';

test(`intersection([2, 1], [2, 3]) => ${intersection([2, 1], [2, 3])}`, () => {
    expect(intersection([2, 1], [2, 3])).toEqual([2]);
});

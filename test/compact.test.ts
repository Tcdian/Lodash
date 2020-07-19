import { compact } from '../source/array/compact';

test(`compact([0, 1, false, 2, '', 3]) => ${compact([0, 1, false, 2, '', 3])}`, () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
});

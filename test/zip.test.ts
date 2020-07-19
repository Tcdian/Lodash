import { zip } from '../source/array/zip';

test(`zip(['a', 'b'], [1, 2], [true, false]) => ${zip(['a', 'b'], [1, 2], [true, false])}`, () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([
        ['a', 1, true],
        ['b', 2, false],
    ]);
});

import { zipWith } from '../source/array/zipWith';

test(`zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) { return a + b + c; }) => ${zipWith(
    [1, 2],
    [10, 20],
    [100, 200],
    function (a, b, c) {
        return a + b + c;
    }
)}`, () => {
    expect(
        zipWith([1, 2], [10, 20], [100, 200], function (a, b, c) {
            return a + b + c;
        })
    ).toEqual([111, 222]);
});

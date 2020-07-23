import { invokeMap } from '../source/collection/invokeMap';

test(`invokeMap([[5, 1, 7], [3, 2, 1]], 'sort') => ${invokeMap(
    [
        [5, 1, 7],
        [3, 2, 1],
    ],
    'sort'
)}`, () => {
    expect(
        invokeMap(
            [
                [5, 1, 7],
                [3, 2, 1],
            ],
            'sort'
        )
    ).toEqual([
        [1, 5, 7],
        [1, 2, 3],
    ]);
});

test(`invokeMap([123, 456], String.prototype.split, '') => ${invokeMap(
    [123, 456],
    String.prototype.split,
    ''
)}`, () => {
    expect(invokeMap([123, 456], String.prototype.split, '')).toEqual([
        ['1', '2', '3'],
        ['4', '5', '6'],
    ]);
});

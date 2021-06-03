import { invokeMap } from '../source/collection/invokeMap';

describe('invokeMap', () => {
    test('invokeMap([[5, 1, 7], [3, 2, 1]], "sort") => [[1, 5, 7], [1, 2, 3]]', () => {
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

    test('invokeMap([123, 456], String.prototype.split, "") => [["1", "2", "3"], ["4", "5", "6"]]', () => {
        expect(invokeMap([123, 456], String.prototype.split, '')).toEqual([
            ['1', '2', '3'],
            ['4', '5', '6'],
        ]);
    });
});

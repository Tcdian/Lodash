import { nth } from '../source/array/nth';

describe('nth', () => {
    test('nth(["a", "b", "c", "d"], 1) => "b"', () => {
        expect(nth(['a', 'b', 'c', 'd'], 1)).toEqual('b');
    });

    test('nth(["a", "b", "c", "d"], -2) => "c"', () => {
        expect(nth(['a', 'b', 'c', 'd'], -2)).toEqual('c');
    });
});

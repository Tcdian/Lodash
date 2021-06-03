import { fromPairs } from '../source/array/fromPairs';

describe('fromPairs', () => {
    test('fromPairs([["a", 1], ["b", 2]]) => { a: 1, b: 2 }', () => {
        expect(
            fromPairs([
                ['a', 1],
                ['b', 2],
            ])
        ).toEqual({ a: 1, b: 2 });
    });
});

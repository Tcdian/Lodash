import { transform } from '../source/object/transform';

describe('transform', () => {
    test('transform array', () => {
        expect(
            transform(
                [2, 3, 4],
                function (result: number[], n) {
                    result.push((n *= n));
                    return n % 2 == 0;
                },
                []
            )
        ).toEqual([4, 9]);
    });

    test('transform object', () => {
        expect(
            transform(
                { a: 1, b: 2, c: 1 },
                function (result: Record<string, string[]>, value, key) {
                    (result[value] || (result[value] = [])).push(key);
                    return result;
                },
                {}
            )
        ).toEqual({ '1': ['a', 'c'], '2': ['b'] });
    });
});

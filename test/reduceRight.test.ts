import { reduceRight } from '../source/collection/reduceRight';

describe('reduceRight', () => {
    test('reduceRight array', () => {
        const array = [
            [0, 1],
            [2, 3],
            [4, 5],
        ];
        expect(
            reduceRight(
                array,
                function (flattened: number[], other) {
                    return flattened.concat(other);
                },
                []
            )
        ).toEqual([4, 5, 2, 3, 0, 1]);
    });
});

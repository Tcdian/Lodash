import { cloneDeepWith } from '../source/lang/cloneDeepWith';
import { isNumber } from '../source/lang/isNumber';

describe('cloneDeepWith', () => {
    function square(value: any) {
        if (isNumber(value)) {
            return Math.pow(value, 2);
        }
    }

    test('cloneDeepWith([ { a: 1, b: 1 }, { b: 2, d: 2 } ])', () => {
        const objects = [
            { a: 1, b: 1 },
            { c: 2, d: 2 },
        ];

        const shallow = cloneDeepWith(objects, square);
        expect(shallow).toEqual([
            { a: 1, b: 1 },
            { c: 4, d: 4 },
        ]);
    });

    test('cloneDeepWith(new Set([ { a: 1, b: 1 }, { a: 2, b: 2 } ]))', () => {
        const set = new Set([
            { a: 1, b: 1 },
            { a: 2, b: 2 },
        ]);
        const shallow = cloneDeepWith(set, square);
        expect(shallow).toEqual(
            new Set([
                { a: 1, b: 1 },
                { a: 4, b: 4 },
            ])
        );
    });
});

import { pullAllWith } from '../source/array/pullAllWith';
import { isEqual } from '../source/lang/isEqual';

describe('pullAllWith', () => {
    test('pullAllWith(array, [{ x: 3, y: 4 }], isEqual) => [{ x: 1, y: 2 }, { x: 5, y: 6 }]', () => {
        const array = [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
            { x: 5, y: 6 },
        ];
        expect(pullAllWith(array, [{ x: 3, y: 4 }], isEqual)).toEqual([
            { x: 1, y: 2 },
            { x: 5, y: 6 },
        ]);
        expect(array).toEqual([
            { x: 1, y: 2 },
            { x: 5, y: 6 },
        ]);
    });
});

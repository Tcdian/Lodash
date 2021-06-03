import { differenceWith } from '../source/array/differenceWith';
import { isEqual } from '../source/lang/isEqual';

describe('differenceWith', () => {
    test('differenceWith([{ x: 1, y: 2 }, { x: 2, y: 1 }], [{ x: 1, y: 2 }], isEqual)', () => {
        expect(
            differenceWith(
                [
                    { x: 1, y: 2 },
                    { x: 2, y: 1 },
                ],
                [{ x: 1, y: 2 }],
                isEqual
            )
        ).toEqual([{ x: 2, y: 1 }]);
    });
});

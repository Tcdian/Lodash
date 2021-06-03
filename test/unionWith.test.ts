import { unionWith } from '../source/array/unionWith';
import { isEqual } from '../source/lang/isEqual';

describe('unionWith', () => {
    test('unionWith([{ x: 1, y: 2 }, { x: 2, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }], isEqual)', () => {
        expect(
            unionWith(
                [
                    { x: 1, y: 2 },
                    { x: 2, y: 1 },
                ],
                [
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                ],
                isEqual
            )
        ).toEqual([
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
        ]);
    });
});

import { xorWith } from '../source/array/xorWith';
import { isEqual } from '../source/lang/isEqual';

describe('xorWith', () => {
    test('xorWith([{ x: 1, y: 2 }, { x: 2, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }], isEqual)', () => {
        expect(
            xorWith(
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
            { x: 2, y: 1 },
            { x: 1, y: 1 },
        ]);
    });
});

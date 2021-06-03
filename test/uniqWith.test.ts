import { uniqWith } from '../source/array/uniqWith';
import { isEqual } from '../source/lang/isEqual';

describe('uniqWith', () => {
    test('uniqWith([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }], isEqual)', () => {
        expect(
            uniqWith(
                [
                    { x: 1, y: 2 },
                    { x: 2, y: 1 },
                    { x: 1, y: 2 },
                ],
                isEqual
            )
        ).toEqual([
            { x: 1, y: 2 },
            { x: 2, y: 1 },
        ]);
    });
});

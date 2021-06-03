import { intersectionWith } from '../source/array/intersectionWith';
import { isEqual } from '../source/lang/isEqual';

describe('intersectionWith', () => {
    test('intersectionWith([{ x: 1, y: 2 }, { x: 2, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }], isEqual)', () => {
        expect(
            intersectionWith(
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
        ).toEqual([{ x: 1, y: 2 }]);
    });
});

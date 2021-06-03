import { flowRight } from '../source/util/flowRight';
import { add } from '../source/math/add';

describe('flowRight', () => {
    function square(n: number) {
        return n * n;
    }

    test('flowRight invoke', () => {
        const addSquare = flowRight(square, add);
        expect(addSquare(1, 2)).toBe(9);
    });
});

import { flow } from '../source/util/flow';
import { add } from '../source/math/add';

describe('flow', () => {
    function square(n: number) {
        return n * n;
    }

    test('flow invoke', () => {
        const addSquare = flow(add, square);
        expect(addSquare(1, 2)).toBe(9);
    });
});

import { flowRight } from '../source/util/flowRight';
import { add } from '../source/math/add';

function square(n: number) {
    return n * n;
}

test('flowRight', () => {
    const addSquare = flowRight(square, add);
    expect(addSquare(1, 2)).toBe(9);
});

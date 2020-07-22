import { flow } from '../source/util/flow';
import { add } from '../source/math/add';

function square(n: number) {
    return n * n;
}

test('flow', () => {
    const addSquare = flow(add, square);
    expect(addSquare(1, 2)).toBe(9);
});

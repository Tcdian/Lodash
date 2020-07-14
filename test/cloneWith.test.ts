import { cloneWith } from '../source/lang/cloneWith';
import { isNumber } from '../source/lang/isNumber';

function square(value: any) {
    if (isNumber(value)) {
        return Math.pow(value, 2);
    }
}

test('cloneWith({ a: 1, b: 2 }, square)', () => {
    const objects = { a: 1, b: 2 };
    const shallow = cloneWith(objects, square);
    expect(shallow).toEqual({ a: 1, b: 4 });
});

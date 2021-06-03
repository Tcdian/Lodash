import { methodOf } from '../source/util/methodOf';
import { constant } from '../source/util/constant';

describe('methodOf', () => {
    test('["a[2]", "c[0]"].map(methodOf(object)) => [2, 0]', () => {
        const array = Array.from(new Array(3), (val, index) => constant(index));
        const object = {
            a: array,
            b: array,
            c: array,
        };
        expect(['a[2]', 'c[0]'].map(methodOf(object))).toEqual([2, 0]);
    });
});

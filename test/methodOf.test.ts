import { methodOf } from '../source/util/methodOf';
import { constant } from '../source/util/constant';

const array = Array.from(new Array(3), (val, index) => constant(index));
const object = {
    a: array,
    b: array,
    c: array,
};

test(`['a[2]', 'c[0]'].map(methodOf(object)) => ${['a[2]', 'c[0]'].map(methodOf(object))}`, () => {
    expect(['a[2]', 'c[0]'].map(methodOf(object))).toEqual([2, 0]);
});

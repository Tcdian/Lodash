import _ from 'lodash';
import gt from '../source/gt';

test(`gt(3, 1) => ${gt(3, 1)}`, () => {
    expect(gt(3, 1)).toBe(_.gt(3, 1));
});

test(`gt(3, 3) => ${gt(3, 3)}`, () => {
    expect(gt(3, 3)).toBe(_.gt(3, 3));
});

test(`gt(1, 3) => ${gt(1, 3)}`, () => {
    expect(gt(1, 3)).toBe(_.gt(1, 3));
});

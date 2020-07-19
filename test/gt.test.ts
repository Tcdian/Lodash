import { gt } from '../source/lang/gt';

test(`gt(3, 1) => ${gt(3, 1)}`, () => {
    expect(gt(3, 1)).toBe(true);
});

test(`gt(3, 3) => ${gt(3, 3)}`, () => {
    expect(gt(3, 3)).toBe(false);
});

test(`gt(1, 3) => ${gt(1, 3)}`, () => {
    expect(gt(1, 3)).toBe(false);
});

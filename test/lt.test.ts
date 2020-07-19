import { lt } from '../source/lang/lt';

test(`lt(1, 3) => ${lt(1, 3)}`, () => {
    expect(lt(1, 3)).toBe(true);
});

test(`lt(3, 3) => ${lt(3, 3)}`, () => {
    expect(lt(3, 3)).toBe(false);
});

test(`lt(3, 1) => ${lt(3, 1)}`, () => {
    expect(lt(3, 1)).toBe(false);
});

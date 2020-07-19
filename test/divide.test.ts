import { divide } from '../source/math/divide';

test(`divide(6, 4) => ${divide(6, 4)}`, () => {
    expect(divide(6, 4)).toBe(1.5);
});

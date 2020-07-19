import { add } from '../source/math/add';

test(`add(6, 4) => ${add(6, 4)}`, () => {
    expect(add(6, 4)).toBe(10);
});

import { sum } from '../source/math/sum';

test(`sum([4, 2, 8, 6]) => ${sum([4, 2, 8, 6])}`, () => {
    expect(sum([4, 2, 8, 6])).toBe(20);
});

import { gte } from '../source/lang/gte';

test(`gte(3, 1) => ${gte(3, 1)}`, () => {
    expect(gte(3, 1)).toBe(true);
});

test(`gte(3, 3) => ${gte(3, 3)}`, () => {
    expect(gte(3, 3)).toBe(true);
});

test(`gte(1, 3) => ${gte(1, 3)}`, () => {
    expect(gte(1, 3)).toBe(false);
});

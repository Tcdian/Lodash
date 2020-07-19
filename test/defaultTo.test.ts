import { defaultTo } from '../source/util/defaultTo';

test(`defaultTo(1, 10) => ${defaultTo(1, 10)}`, () => {
    expect(defaultTo(1, 10)).toBe(1);
});

test(`defaultTo(undefined, 10) => ${defaultTo(undefined, 10)}`, () => {
    expect(defaultTo(undefined, 10)).toBe(10);
});

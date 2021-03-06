import { negate } from '../source/function/negate';

function isEven(n: number) {
    return n % 2 === 0;
}

test(`negate(isEven)(1) => ${negate(isEven)(1)}`, () => {
    expect(negate(isEven)(1)).toBe(true);
});

test(`negate(isEven)(2) => ${negate(isEven)(2)}`, () => {
    expect(negate(isEven)(2)).toBe(false);
});

import { negate } from '../source/function/negate';

describe('negate', () => {
    function isEven(n: number) {
        return n % 2 === 0;
    }

    test('negate(isEven)(1) => true', () => {
        expect(negate(isEven)(1)).toBe(true);
    });

    test('negate(isEven)(2) => false', () => {
        expect(negate(isEven)(2)).toBe(false);
    });
});

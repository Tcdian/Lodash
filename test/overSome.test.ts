import { overSome } from '../source/util/overSome';

describe('overSome', () => {
    test('overSome([Boolean, isFinite])', () => {
        const func = overSome([Boolean, isFinite]);
        expect(func(1)).toBe(true);
        expect(func(0)).toBe(true);
        expect(func(NaN)).toBe(false);
    });
    test('overSome default parameters', () => {
        const func = overSome();
        expect(func(false)).toBe(false);
        expect(func(true)).toBe(true);
    });
});

import { overEvery } from '../source/util/overEvery';

describe('overEvery', () => {
    test('overEvery([Boolean, isFinite])', () => {
        const func = overEvery([Boolean, isFinite]);
        expect(func(1)).toBe(true);
        expect(func(0)).toBe(false);
        expect(func(NaN)).toBe(false);
    });
});

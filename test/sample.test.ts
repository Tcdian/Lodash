import { sample } from '../source/collection/sample';

describe('sample', () => {
    test('sample([1, 2, 3, 4])', () => {
        const randomEl = sample([1, 2, 3, 4]);
        expect(randomEl).toBeLessThanOrEqual(4);
        expect(randomEl).toBeGreaterThanOrEqual(1);
    });

    test('sample({ a: 1, b: 2, c: 3, d: 4 })', () => {
        const randomEl = sample({ a: 1, b: 2, c: 3, d: 4 });
        expect(randomEl).toBeLessThanOrEqual(4);
        expect(randomEl).toBeGreaterThanOrEqual(1);
    });
});

import { over } from '../source/util/over';

describe('over', () => {
    test('over([Math.max, Math.min])', () => {
        const func = over([Math.max, Math.min]);
        expect(func(1, 2, 3, 4)).toEqual([4, 1]);
    });
});

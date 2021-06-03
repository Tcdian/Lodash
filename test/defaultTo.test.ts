import { defaultTo } from '../source/util/defaultTo';

describe('defaultTo', () => {
    test('defaultTo(1, 10) => 1', () => {
        expect(defaultTo(1, 10)).toBe(1);
    });

    test('defaultTo(undefined, 10) => 10', () => {
        expect(defaultTo(undefined, 10)).toBe(10);
    });
});

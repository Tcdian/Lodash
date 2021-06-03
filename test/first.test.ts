import { first } from '../source/array/first';

describe('first', () => {
    test('first([1, 2, 3]) => 1', () => {
        expect(first([1, 2, 3])).toEqual(1);
    });

    test('first([]) => undefined', () => {
        expect(first([])).toEqual(undefined);
    });
});

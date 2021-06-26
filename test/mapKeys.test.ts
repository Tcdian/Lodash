import { mapKeys } from '../source/object/mapKeys';

describe('mapKeys', () => {
    test('mapKeys({ a: 1, b: 2 }, (value, key) => key + value) => { a1: 1, b2: 2 }', () => {
        expect(mapKeys({ a: 1, b: 2 }, (value, key) => key + value)).toEqual({ a1: 1, b2: 2 });
    });
});

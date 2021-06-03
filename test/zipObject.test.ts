import { zipObject } from '../source/array/zipObject';

describe('zipObject', () => {
    test('zipObject(["a", "b"], [1, 2]) => { "a": 1, "b": 2 }', () => {
        expect(zipObject(['a', 'b'], [1, 2])).toEqual({ a: 1, b: 2 });
    });
});

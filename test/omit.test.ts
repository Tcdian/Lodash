import { omit } from '../source/object/omit';

describe('omit', () => {
    test('omit({ a: 1, b: "2", c: 3 }, ["a", "c"]) => { b: "2" }', () => {
        expect(omit({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ b: '2' });
    });
});

import { invert } from '../source/object/invert';

describe('invert', () => {
    test('invert({ a: 1, b: 2, c: 1 }) => { "1": "c", "2": "b" }', () => {
        expect(invert({ a: 1, b: 2, c: 1 })).toEqual({ '1': 'c', '2': 'b' });
    });
});

import { defaults } from '../source/object/defaults';

describe('defaults', () => {
    test('defaults({ a: 1 }, { b: 2 }, { a: 3 }) => { a: 1, b: 2 }', () => {
        expect(defaults({ a: 1 }, { b: 2 }, { a: 3 })).toEqual({ a: 1, b: 2 });
    });
});

import { pick } from '../source/object/pick';

describe('pick', () => {
    test('pick({ a: 1, b: "2", c: 3 }, ["a", "c"]) => { a: 1, c: 3 }', () => {
        expect(pick({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });
});

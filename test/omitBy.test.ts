import { omitBy } from '../source/object/omitBy';
import { isNumber } from '../source/lang/isNumber';

describe('omitBy', () => {
    test('omitBy({ a: 1, b: "2", c: 3 }, isNumber) => { b: "2" }', () => {
        expect(omitBy({ a: 1, b: '2', c: 3 }, isNumber)).toEqual({ b: '2' });
    });
});

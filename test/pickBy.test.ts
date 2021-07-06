import { pickBy } from '../source/object/pickBy';
import { isNumber } from '../source/lang/isNumber';

describe('pickBy', () => {
    test('pickBy({ a: 1, b: "2", c: 3 }, isNumber) => { a: 1, c: 3 }', () => {
        expect(pickBy({ a: 1, b: '2', c: 3 }, isNumber)).toEqual({ a: 1, c: 3 });
    });
});

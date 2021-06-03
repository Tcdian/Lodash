import { valuesIn } from '../source/object/valuesIn';
import { create } from '../source/object/create';

describe('valuesIn', () => {
    test('valuesIn(create({ a: 1 }, { b: 2, c: 3 })) => [2, 3, 1]', () => {
        const object = create({ a: 1 }, { b: 2, c: 3 });
        expect(valuesIn(object)).toEqual([2, 3, 1]);
    });
});

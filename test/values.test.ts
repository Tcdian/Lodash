import { values } from '../source/object/values';
import { create } from '../source/object/create';

describe('values', () => {
    test('values(create({ a: 1 }, { b: 2, c: 3 })) => [2, 3]', () => {
        const object = create({ a: 1 }, { b: 2, c: 3 });
        expect(values(object)).toEqual([2, 3]);
    });
});

import { assign } from '../source/object/assign';
import { create } from '../source/object/create';

describe('assign', () => {
    const source = create({ b: 2 }, { a: 1 });

    test('overwrite property', () => {
        expect(assign({ a: 0 }, { a: 1 })).toEqual({ a: 1 });
    });

    test('assign iterates own source properties', () => {
        expect(assign({ a: 0 }, source)).toEqual({ a: 1 });
    });
});

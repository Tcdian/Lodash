import { assignIn } from '../source/object/assignIn';
import { create } from '../source/object/create';

describe('assignIn', () => {
    const source = create({ b: 2 }, { a: 1 });

    test('overwrite property', () => {
        expect(assignIn({ a: 0 }, { a: 1 })).toEqual({ a: 1 });
    });

    test('assign iterates own and inherited source properties', () => {
        expect(assignIn({ a: 0 }, source)).toEqual({ a: 1, b: 2 });
    });
});

import { assign } from '../source/object/assign';
import { create } from '../source/object/create';

describe('assign', () => {
    const source1 = create({ b: 2 }, { a: 1 });
    const source2 = create({ d: 4 }, { c: 3 });

    test('assign({ a: 0 }, source1) => { a: 1 }', () => {
        expect(assign({ a: 0 }, source1)).toEqual({ a: 1 });
    });

    test('assign({ a: 0 }, source2) => { a: 0, c: 3 }', () => {
        expect(assign({ a: 0 }, source2)).toEqual({ a: 0, c: 3 });
    });

    test('assign({ a: 0 }, source1, source2) => { a: 1, c: 3 }', () => {
        expect(assign({ a: 0 }, source1, source2)).toEqual({ a: 1, c: 3 });
    });
});

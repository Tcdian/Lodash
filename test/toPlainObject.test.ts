import { toPlainObject } from '../source/lang/toPlainObject';
import { create } from '../source/object/create';
import { assign } from '../source/object/assign';

describe('toPlainObject', () => {
    test('toPlainObject', () => {
        const source = create({ c: 3 }, { b: 2 });
        expect(assign({ a: 1 }, source)).toEqual({ a: 1, b: 2 });
        expect(assign({ a: 1 }, toPlainObject(source))).toEqual({ a: 1, b: 2, c: 3 });
    });
});

import { assignInWith } from '../source/object/assignInWith';
import { create } from '../source/object/create';
import { isUndefined } from '../source/lang/isUndefined';

describe('assignInWith', () => {
    const source1 = create({ a: 3 });
    const source2 = create({ b: 3 });

    function customizer(objValue: number | undefined, srcValue: number | undefined) {
        return isUndefined(objValue) ? srcValue : objValue;
    }

    test('assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer) => { a: 1, b: 2 }', () => {
        expect(assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });

    test('assignInWith({ a: 1 }, { b: 2 }, source1, customizer) => { a: 1, b: 2 }', () => {
        expect(assignInWith({ a: 1 }, { b: 2 }, source1, customizer)).toEqual({ a: 1, b: 2 });
    });

    test('assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer) => { a: 1, b: 2 }', () => {
        expect(assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)).toEqual({ a: 1, b: 2 });
    });
});

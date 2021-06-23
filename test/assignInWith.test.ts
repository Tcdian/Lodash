import { assignInWith } from '../source/object/assignInWith';
import { create } from '../source/object/create';
import { isUndefined } from '../source/lang/isUndefined';

describe('assignInWith', () => {
    const source = create({ b: 2 });

    function customizer(objValue?: number, srcValue?: number) {
        return isUndefined(objValue) ? srcValue : objValue;
    }

    test('assignInWith customizer', () => {
        expect(assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });

    test('assignInWith iterates own and inherited source properties', () => {
        expect(assignInWith({ a: 1 }, source, { b: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });
});

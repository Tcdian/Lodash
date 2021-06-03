import { assignWith } from '../source/object/assignWith';
import { isUndefined } from '../source/lang/isUndefined';

describe('assignWith', () => {
    function customizer(objValue: number | undefined, srcValue: number | undefined) {
        return isUndefined(objValue) ? srcValue : objValue;
    }

    test('assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer) => { a: 1, b: 2 }', () => {
        expect(assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });
});

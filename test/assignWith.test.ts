import { assignWith } from '../source/object/assignWith';
import { isUndefined } from '../source/lang/isUndefined';

describe('assignWith', () => {
    function customizer(objValue?: number, srcValue?: number) {
        return isUndefined(objValue) ? srcValue : objValue;
    }

    test('assignWith customizer', () => {
        expect(assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });
});

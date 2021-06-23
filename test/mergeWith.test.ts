import { mergeWith } from '../source/object/mergeWith';
import { isArray } from '../source/lang/isArray';

describe('mergeWith', () => {
    test('mergeWith customizer', () => {
        function customizer(objValue: any, srcValue: any) {
            if (isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        const object = { a: [1], b: [2] };
        const other = { a: [3], b: [4] };
        expect(mergeWith(object, other, customizer)).toEqual({ a: [1, 3], b: [2, 4] });
    });
});

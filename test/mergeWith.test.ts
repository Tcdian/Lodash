import { mergeWith } from '../source/object/mergeWith';
import { isArray } from '../source/lang/isArray';

function customizer(objValue: any, srcValue: any) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

const object = { a: [1], b: [2] };
const other = { a: [3], b: [4] };

test('mergeWith({ a: [1], b: [2] }, { a: [3], b: [4] }, customizer)', () => {
    expect(mergeWith(object, other, customizer)).toEqual({ a: [1, 3], b: [2, 4] });
});

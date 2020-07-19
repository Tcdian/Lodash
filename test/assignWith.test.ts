import { assignWith } from '../source/object/assignWith';
import { isUndefined } from '../source/lang/isUndefined';

function customizer(objValue: number | undefined, srcValue: number | undefined) {
    return isUndefined(objValue) ? srcValue : objValue;
}

test('assignWith', () => {
    expect(assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
});

import _ from 'lodash';
import { mergeWith } from '../source/object/mergeWith';

function customizer(objValue: any, srcValue: any) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

const object = { a: [1], b: [2] };
const other = { a: [3], b: [4] };

test('mergeWith({ a: [1], b: [2] }, { a: [3], b: [4] }, customizer)', () => {
    expect(mergeWith(object, other, customizer)).toEqual(_.mergeWith(object, other, customizer));
});

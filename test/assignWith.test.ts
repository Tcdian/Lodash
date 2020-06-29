import _ from 'lodash';
import { assignWith } from '../source/object';

function customizer(objValue: number | undefined, srcValue: number | undefined) {
    return _.isUndefined(objValue) ? srcValue : objValue;
}

test('assignWith', () => {
    expect(assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual(
        _.assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)
    );
});

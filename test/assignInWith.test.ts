import _ from 'lodash';
import { create, assignInWith } from '../source/object';

let source1: { a: number };
let source2: { b: number };

beforeEach(() => {
    source1 = create({ a: 3 });
    source2 = create({ b: 3 });
});

function customizer(objValue: number | undefined, srcValue: number | undefined) {
    return _.isUndefined(objValue) ? srcValue : objValue;
}

test('assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual(
        _.assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)
    );
});

test('assignInWith({ a: 1 }, { b: 2 }, source1, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, source1, customizer)).toEqual(
        _.assignInWith({ a: 1 }, { b: 2 }, source1, customizer)
    );
});

test('assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)).toEqual(
        _.assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)
    );
});

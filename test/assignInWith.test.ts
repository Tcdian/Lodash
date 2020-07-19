import { assignInWith } from '../source/object/assignInWith';
import { create } from '../source/object/create';
import { isUndefined } from '../source/lang/isUndefined';

let source1: { a: number };
let source2: { b: number };

beforeEach(() => {
    source1 = create({ a: 3 });
    source2 = create({ b: 3 });
});

function customizer(objValue: number | undefined, srcValue: number | undefined) {
    return isUndefined(objValue) ? srcValue : objValue;
}

test('assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
});

test('assignInWith({ a: 1 }, { b: 2 }, source1, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, source1, customizer)).toEqual({ a: 1, b: 2 });
});

test('assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)', () => {
    expect(assignInWith({ a: 1 }, { b: 2 }, source1, source2, customizer)).toEqual({ a: 1, b: 2 });
});

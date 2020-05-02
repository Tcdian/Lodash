import _ from 'lodash';
import isWeakMap from '../source/isWeakMap';

test(`isWeakMap(new WeakMap) => ${isWeakMap(new WeakMap())}`, () => {
    expect(isWeakMap(new WeakMap())).toBe(_.isWeakMap(new WeakMap()));
});

test(`isWeakMap(new Map) => ${isWeakMap(new Map())}`, () => {
    expect(isWeakMap(new Map())).toBe(_.isWeakMap(new Map()));
});

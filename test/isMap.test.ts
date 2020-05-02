import _ from 'lodash';
import isMap from '../source/isMap';

test(`isMap(new Map) => ${isMap(new Map())}`, () => {
    expect(isMap(new Map())).toBe(_.isMap(new Map()));
});

test(`isMap(new WeakMap) => ${isMap(new WeakMap())}`, () => {
    expect(isMap(new WeakMap())).toBe(_.isMap(new WeakMap()));
});

import _ from 'lodash';
import isWeakSet from '../source/isWeakSet';

test(`isWeakSet(new WeakSet) => ${isWeakSet(new WeakSet())}`, () => {
    expect(isWeakSet(new WeakSet())).toBe(_.isWeakSet(new WeakSet()));
});

test(`isWeakSet(new Set) => ${isWeakSet(new Set())}`, () => {
    expect(isWeakSet(new Set())).toBe(_.isWeakSet(new Set()));
});

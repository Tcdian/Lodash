import _ from 'lodash';
import isSet from '../source/isSet';

test(`isSet(new Set) => ${isSet(new Set())}`, () => {
    expect(isSet(new Set())).toBe(_.isSet(new Set()));
});

test(`isSet(new WeakSet) => ${isSet(new WeakSet())}`, () => {
    expect(isSet(new WeakSet())).toBe(_.isSet(new WeakSet()));
});

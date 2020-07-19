import _ from 'lodash';
import { merge } from '../source/object/merge';

const object = { a: { b: 2, d: 4 } };
const other = { a: { c: 3, e: 5 } };

interface Recursive {
    a?: Recursive;
}

test('merge({ a: { b: 2, d: 4 } }, { a: { c: 3, e: 5 } })', () => {
    expect(merge({}, object, other)).toEqual({
        a: {
            b: 2,
            d: 4,
            c: 3,
            e: 5,
        },
    });
});

test('merge recursive', () => {
    const recursiveA: Recursive = {};
    recursiveA.a = recursiveA;
    const recursiveB: Recursive = {};
    recursiveB.a = recursiveB;
    const recursiveA1: Recursive = {};
    recursiveA1.a = recursiveA1;
    const recursiveB1: Recursive = {};
    recursiveB1.a = recursiveB1;
    expect(merge(recursiveA, recursiveB, other)).toEqual(_.merge(recursiveA1, recursiveB1, other));
});

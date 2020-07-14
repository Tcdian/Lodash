import _ from 'lodash';
import { isArrayBuffer } from '../source/lang/isArrayBuffer';

test(`isArrayBuffer(new ArrayBuffer(2)) => ${isArrayBuffer(new ArrayBuffer(2))}`, () => {
    expect(isArrayBuffer(new ArrayBuffer(2))).toBe(_.isArrayBuffer(new ArrayBuffer(2)));
});

test(`isArrayBuffer(new Array(2)) => ${isArrayBuffer(new Array(2))}`, () => {
    expect(isArrayBuffer(new Array(2))).toBe(_.isArrayBuffer(new Array(2)));
});

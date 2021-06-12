import { isString } from './isString';
import { isObject } from './isObject';
import { isArray } from './isArray';
import { isTypedArray } from './isTypedArray';
import { isArrayBuffer } from './isArrayBuffer';

function toArray(value: any): any[] {
    if (isString(value)) {
        return value.split('');
    }
    if (!isObject(value)) {
        return [];
    }
    if (isArray(value) || isTypedArray(value) || isArrayBuffer(value)) {
        return value.slice();
    }
    if (isArrayLike(val)) return _arrayProto.slice.call(val);
    if (isSet(val) || isMap(val)) return Array.from(val.values());
    return values(val);
}

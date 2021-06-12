import { isString } from './isString';
import { isObject } from './isObject';
import { isArray } from './isArray';
import { isTypedArray } from './isTypedArray';
import { isArrayBuffer } from './isArrayBuffer';
import { isArrayLike } from './isArrayLike';
import { isSet } from './isSet';
import { isMap } from './isMap';
import { values } from '../object/values';

function toArray(value: any): any[] {
    if (isString(value)) {
        return value.split('');
    }
    if (!isObject(value)) {
        return [];
    }
    if (isArray(value) || isTypedArray(value) || isArrayBuffer(value)) {
        return (value as any).slice();
    }
    if (isArrayLike(value)) {
        return Array.prototype.slice.call(value);
    }
    if (isSet(value) || isMap(value)) {
        return Array.from(value.values());
    }
    return values(value);
}

export { toArray };

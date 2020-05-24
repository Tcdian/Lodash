import isUndefined from './isUndefined';
import isObject from './isObject';
import isArray from './isArray';
import _baseGetTag from './_baseGetTag';
import isSet from './isSet';
import isMap from './isMap';
import keys from './keys';
import keysIn from './keysIn';
import getAllKeys from './getAllKeys';
import getAllKeysIn from './getAllKeysIn';

type CloneWithCustomizer<TSource, TTarget> = (
    value: TSource,
    key?: any,
    object?: object,
    cache?: Map<TSource, TSource | TTarget>
) => TTarget;

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_FLAT_FLAG = 1 << 1;
const CLONE_SYMBOLS_FLAG = 1 << 2;

function _baseClone<TSource, TTarget>(
    value: TSource,
    bitmask: number,
    customizer?: CloneWithCustomizer<TSource, TTarget>,
    key?: any,
    Object?: any,
    cache?: Map<TSource, TSource | TTarget>
): TSource | TTarget;
function _baseClone(
    value: any,
    bitmask: number,
    customizer?: any,
    key?: any,
    object?: any,
    cache: Map<any, any> = new Map()
) {
    let result: any;
    const isDeep = bitmask & CLONE_DEEP_FLAG;
    const isFlat = bitmask & CLONE_FLAT_FLAG;
    const isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
        result = object ? customizer(value, key, object, cache) : customizer(value);
    }
    if (!isUndefined(result)) {
        return result;
    }
    if (!isObject(value)) {
        return value;
    }
    if (isArray(value)) {
        if (!isDeep) {
            return [...value];
        }
        result = new Array(value.length);
    } else {
        const tag = _baseGetTag(value);
        if (tag === '[object Object]') {
            result = Object.create(Object.getPrototypeOf(value));
        } else if (tag === '[object Set]') {
            result = new Set();
        } else if (tag === '[object Map]') {
            result = new Map();
        } else {
            // todo ... 函数，正则和其它包装对象
            result = {};
        }
    }

    if (cache.has(value)) {
        return cache.get(value);
    }
    cache.set(value, result);

    if (isArray(value)) {
        value.forEach((subValue, index) => {
            result[index] = _baseClone(subValue, bitmask, customizer, index, value, cache);
        });
        return result;
    }

    if (isSet(value)) {
        value.forEach((subValue) => {
            result.add(_baseClone(subValue, bitmask, customizer, subValue, value, cache));
        });
        return result;
    }
    if (isMap(value)) {
        value.forEach((subValue, key) => {
            result.set(key, _baseClone(subValue, bitmask, customizer, key, value, cache));
        });
        return result;
    }
    const keysFunc = isFlat ? (isFull ? getAllKeys : keysIn) : isFull ? getAllKeysIn : keys;
    keysFunc(value).forEach((key) => {
        Object.assign(result, {
            [key]: _baseClone((value as any)[key], bitmask, customizer, key, value, cache),
        });
    });
    return result;
}

export default _baseClone;

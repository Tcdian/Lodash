import { _baseGetTag } from './_baseGetTag';
import { isArray } from './isArray';
import { isUndefined } from './isUndefined';

type PropertyName = string | number | symbol;
type IsEqualCustomizer = (
    objValue: any,
    othValue: any,
    key?: PropertyName,
    object?: any,
    other?: any,
    cache?: Map<any, any>
) => any;

function _baseIsEqual(value: any, other: any, customizer?: IsEqualCustomizer, cache = new Map()): boolean {
    if (Object.is(value, other)) {
        return true;
    }
    if (value == null || other == null) {
        return false;
    }
    if (typeof value !== 'object' && typeof other !== 'object') {
        return false;
    }
    return _baseIsEqualDeep(value, other, customizer, cache);
}

function _baseIsEqualDeep(value: any, other: any, customizer?: IsEqualCustomizer, cache = new Map()) {
    const valTag = _baseGetTag(value);
    const othTag = _baseGetTag(other);
    if (valTag !== othTag) {
        return false;
    }
    switch (valTag) {
        case '[object String]':
        case '[object RegExp]':
            return '' + value === '' + other;
        case '[object Number]':
        case '[object Date]':
        case '[object Boolean]':
            return Object.is(+value, +other);
        case '[object Symbol]':
            return Symbol.prototype.valueOf.call(value) === Symbol.prototype.valueOf.call(other);
    }
    if (cache.has(value)) {
        return cache.get(value) === other && cache.get(other) === value;
    }
    cache.set(value, other);
    cache.set(other, value);
    let result: boolean;
    if (isArray(value) && isArray(other)) {
        if (value.length !== other.length) {
            return false;
        }
        result = value.every((v, index) => {
            const compared = customizer && customizer(value[index], other[index], index, value, other, cache);
            if (!isUndefined(compared)) {
                return !!compared;
            }
            return _baseIsEqual(value[index], other[index], customizer, cache);
        });
    } else {
        const keys = Object.keys(value);
        if (keys.length !== Object.keys(other).length) {
            return false;
        }
        result = keys.every((key) => {
            const compared = customizer && customizer(value[key], other[key], key, value, other, cache);
            if (!isUndefined(compared)) {
                return !!compared;
            }
            return _baseIsEqual(value[key], other[key], customizer, cache);
        });
    }
    cache.delete(value);
    cache.delete(other);
    return result;
}

export { _baseIsEqual, IsEqualCustomizer };

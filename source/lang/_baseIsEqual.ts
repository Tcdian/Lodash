import { _baseGetTag } from './_baseGetTag';
import { isArray } from './isArray';
import { isUndefined } from './isUndefined';
import { keys } from '../object/keys';

type IsEqualCustomizer = (
    objValue: any,
    othValue: any,
    key: any,
    object: any,
    other: any,
    stack: any
) => boolean | undefined;

const COMPARE_PARTIAL_FLAG = 1 << 0;

function _baseIsEqual(value: any, other: any, bitmask = 0, customizer?: IsEqualCustomizer, stack = new Map()): boolean {
    if (Object.is(value, other)) {
        return true;
    }
    if (value == null || other == null) {
        return false;
    }
    if (typeof value !== 'object' && typeof other !== 'object') {
        return false;
    }
    return _baseIsEqualDeep(value, other, bitmask, customizer, stack);
}

function _baseIsEqualDeep(value: any, other: any, bitmask: number, customizer?: IsEqualCustomizer, stack = new Map()) {
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
    if (stack.has(value)) {
        return stack.get(value) === other && stack.get(other) === value;
    }
    stack.set(value, other);
    stack.set(other, value);
    let result: boolean;
    const isPartial = bitmask & COMPARE_PARTIAL_FLAG;
    if (isArray(value) && isArray(other)) {
        if (!isPartial && value.length !== other.length) {
            return false;
        }
        result = other.every((v, index) => {
            const compared = customizer && customizer(value[index], other[index], index, value, other, stack);
            if (!isUndefined(compared)) {
                return !!compared;
            }
            return _baseIsEqual(value[index], other[index], bitmask, customizer, stack);
        });
    } else {
        const otherKeys = keys(other);
        if (!isPartial && otherKeys.length !== keys(value).length) {
            return false;
        }
        result = otherKeys.every((key) => {
            const compared = customizer && customizer(value[key], other[key], key, value, other, stack);
            if (!isUndefined(compared)) {
                return !!compared;
            }
            return _baseIsEqual(value[key], other[key], bitmask, customizer, stack);
        });
    }
    stack.delete(value);
    stack.delete(other);
    return result;
}

export { _baseIsEqual, IsEqualCustomizer };

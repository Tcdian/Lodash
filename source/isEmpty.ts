import isNil from './isNil';
import isArray from './isArray';
import isString from './isString';
import isSet from './isSet';
import isMap from './isMap';
import isObject from './isObject';

function isEmpty(value: any): boolean {
    if (isNil(value)) {
        return true;
    }
    if (isArray(value) || isString(value)) {
        return !value.length;
    }
    if (isSet(value) || isMap(value)) {
        return !value.size;
    }
    if (isObject(value)) {
        return !Object.keys(value).length;
    }
    return true;
}

export default isEmpty;

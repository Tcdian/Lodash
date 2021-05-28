import { isNil } from './isNil';
import { isString } from './isString';
import { isArray } from './isArray';
import { isSymbol } from './isSymbol';

const symbolProto = Symbol.prototype;

function toString(value: any): string {
    if (isNil(value)) {
        return '';
    }
    if (isString(value)) {
        return value;
    }
    if (isArray(value)) {
        return value.map((arrVal) => toString(arrVal)) + '';
    }
    if (isSymbol(value)) {
        return symbolProto.toString.call(value);
    }
    const result = value + '';
    return result === '0' && 1 / value == -Infinity ? '-0' : result;
}

export { toString };

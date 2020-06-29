import { isArray } from '../lang/isArray';
import { isSymbol } from '../lang/isSymbol';
import { toString } from '../lang/toString';

function toPath(value: any): (string | symbol)[] {
    if (isSymbol(value)) {
        return [value];
    }
    if (isArray(value)) {
        return value.map((arrVal) => (isSymbol(arrVal) ? arrVal : toString(arrVal)));
    }
    return toString(value)
        .replace(/\[+\.*/g, '.')
        .replace(/\]+$/, '')
        .replace(/\]+\.*/g, '.')
        .split('.');
}

export { toPath };

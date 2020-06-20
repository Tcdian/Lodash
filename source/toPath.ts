import isArray from './isArray';
import isSymbol from './isSymbol';
import toString from './toString';

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

export default toPath;

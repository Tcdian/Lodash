import isArray from './isArray';
import isString from './isString';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function includes<T>(collection: T[] | Dictionary<T> | NumericDictionary<T>, value: T, fromIndex?: number): boolean;
function includes(
    collection: any[] | Dictionary<any> | NumericDictionary<any>,
    value: any,
    fromIndex: number = 0
): boolean {
    if (isArray(collection) || isString(collection)) {
        return collection.includes(value, fromIndex);
    }
    return Object.values(collection).includes(value, fromIndex);
}

export default includes;

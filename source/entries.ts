import isSet from './isSet';
import isMap from './isMap';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function entries<T>(object: T[] | Dictionary<T> | NumericDictionary<T>): [string, T][];
function entries<T>(set: Set<T>): [T, T][];
function entries<T, U>(map: Map<T, U>): [T, U][];
function entries(object: object): [any, any][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    return Object.entries(object);
}

export default entries;

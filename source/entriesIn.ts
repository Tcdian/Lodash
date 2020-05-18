import isSet from './isSet';
import isMap from './isMap';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function entriesIn<T>(object: T[] | Dictionary<T> | NumericDictionary<T>): [string, T][];
function entriesIn<T>(set: Set<T>): [T, T][];
function entriesIn<T, U>(map: Map<T, U>): [T, U][];
function entriesIn<T>(object: Dictionary<T>): [string, T][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    const result: [string, T][] = [];
    for (let key in object) {
        result.push([key, object[key]]);
    }
    return result;
}

export default entriesIn;

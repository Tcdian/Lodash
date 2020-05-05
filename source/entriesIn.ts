import isSet from './isSet';
import isMap from './isMap';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}
function entriesIn<T>(object: Dictionary<T> | NumericDictionary<T>): [string, T][];
function entriesIn<T>(set: Set<T>): [T, T][];
function entriesIn<T, U>(map: Map<T, U>): [T, U][];
function entriesIn(object: object): [any, any][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    return [...Object.entries(object), ...Object.entries(Object.getPrototypeOf(object))];
}

export default entriesIn;

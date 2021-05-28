import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function entriesIn<T>(object: T[] | Record<PropertyName, T>): [string, T][];
function entriesIn<T>(set: Set<T>): [T, T][];
function entriesIn<T, U>(map: Map<T, U>): [T, U][];
function entriesIn<T>(object: Record<PropertyName, T>): [string, T][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    const result: [string, T][] = [];
    for (const key in object) {
        result.push([key, object[key]]);
    }
    return result;
}

export { entriesIn };

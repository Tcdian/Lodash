import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function entries<T>(object: T[] | Record<PropertyName, T>): [string, T][];
function entries<T>(set: Set<T>): [T, T][];
function entries<T, U>(map: Map<T, U>): [T, U][];
function entries<T>(object: T[] | Record<PropertyName, T>): [string, T][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    return Object.entries(object);
}

export { entries };

import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function entries<T>(object: T[] | Record<PropertyName, T>): [string, T][];
function entries<T>(set: Set<T>): [T, T][];
function entries<K, V>(map: Map<K, V>): [K, V][];
function entries<T>(object: T[] | Record<PropertyName, T>): [string, T][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    return Object.entries(object);
}

export { entries };

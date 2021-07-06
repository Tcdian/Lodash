import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function entries<T>(array: T[]): [string, T][];
function entries(string: string): [string, string][];
function entries<K extends PropertyName, V>(object: Record<K, V>): [K, V][];
function entries<T>(set: Set<T>): [T, T][];
function entries<K, V>(map: Map<K, V>): [K, V][];
function entries(object: any): [string, any][];
function entries(object: any): [string, any][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    return Object.entries(object);
}

export { entries };

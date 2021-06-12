import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function entriesIn<T>(array: T[]): [string, T][];
function entriesIn(string: string): [string, string][];
function entriesIn<K extends PropertyName, V>(object: Record<K, V>): [K, V][];
function entriesIn<T>(set: Set<T>): [T, T][];
function entriesIn<K, V>(map: Map<K, V>): [K, V][];
function entriesIn(object: any): [string, any][];
function entriesIn(object: any): [string, any][] {
    if (isSet(object) || isMap(object)) {
        return [...object.entries()];
    }
    const result: [string, any][] = [];
    for (const key in object) {
        result.push([key, object[key]]);
    }
    return result;
}

export { entriesIn };

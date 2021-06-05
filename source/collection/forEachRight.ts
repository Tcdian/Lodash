import { identity } from '../util/identity';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function forEachRight<T>(collection: T[], iteratee?: ArrayIterator<T, any>): T[];
function forEachRight(collection: string, iteratee?: StringIterator<any>): string;
function forEachRight<K extends PropertyName, V>(
    collection: Record<K, V>,
    iteratee?: RecordIterator<K, V, any>
): Record<K, V>;
function forEachRight(collection: any, iteratee: (value: any, key: any, collection: any) => any = identity): any {
    if (isArray(collection)) {
        entries(collection)
            .reverse()
            .forEach(([key, value]) => iteratee(value, Number(key), collection));
    } else if (isString(collection)) {
        entries(collection)
            .reverse()
            .forEach(([key, value]) => iteratee(value, Number(key), collection));
    } else {
        entries(collection)
            .reverse()
            .forEach(([key, value]) => iteratee(value, key, collection));
    }
    return collection;
}

export { forEachRight };

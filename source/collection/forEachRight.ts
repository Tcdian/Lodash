import { identity } from '../util/identity';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { keys } from '../object/keys';

type PropertyName = string | number | symbol;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function forEachRight<T>(collection: T[], iteratee?: ArrayIterator<T, any>): T[];
function forEachRight(collection: string, iteratee?: StringIterator<any>): string;
function forEachRight<T, K extends PropertyName>(
    collection: Record<K, T>,
    iteratee?: RecordIterator<K, T, any>
): Record<K, T>;
function forEachRight(collection: any, iteratee: (...args: any[]) => any = identity): any {
    if (isArray(collection) || isString(collection)) {
        keys(collection)
            .reverse()
            .forEach((key) => iteratee(collection[Number(key)], Number(key), collection));
    } else {
        keys(collection)
            .reverse()
            .forEach((key) => iteratee(collection[key], key, collection));
    }
    return collection;
}

export { forEachRight };

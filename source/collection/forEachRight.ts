import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func = (...args: any[]) => any;
type PropertyName = string | number | symbol;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function forEachRight<T>(collection: T[], predicate?: ArrayIterator<T, unknown>): T[];
function forEachRight(collection: string, predicate?: StringIterator<unknown>): string;
function forEachRight<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, unknown>
): Record<K, V>;
function forEachRight(collection: any, predicate: Func = identity): any {
    const iterateeFunc = iteratee(predicate);
    const pairs = entries(collection);
    const len = pairs.length;
    for (let i = len - 1; i >= 0; i--) {
        const pair = pairs[i];
        let [key, value]: [PropertyName, any] = pair;
        if (isArray(collection) || isString(collection)) {
            key = Number(key);
        }
        iterateeFunc(value, key, pair);
    }
    return collection;
}

export { forEachRight };

import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;

function forEachRight<T>(collection: T[], predicate?: ArrayIterator<T, unknown>): T[];
function forEachRight(collection: string, predicate?: StringIterator<unknown>): string;
function forEachRight<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, unknown>
): Record<K, V>;
function forEachRight(collection: any, predicate: Func<any[], any> = identity): any {
    const iterateeFunc = iteratee(predicate);
    const pairs = entries(collection);
    const len = pairs.length;
    for (let i = len - 1; i >= 0; i--) {
        const pair = pairs[i];
        let [key, value]: [PropertyName, any] = pair;
        if (isArray(collection) || isString(collection)) {
            key = Number(key);
        }
        if (iterateeFunc(value, key, collection) === false) {
            return collection;
        }
    }
    return collection;
}

export { forEachRight };

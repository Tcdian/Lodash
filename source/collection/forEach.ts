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

function forEach<T>(collection: T[], predicate?: ArrayIterator<T, unknown>): T[];
function forEach(collection: string, predicate?: StringIterator<unknown>): string;
function forEach<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, unknown>
): Record<K, V>;
function forEach(collection: any, predicate: Func = identity): any {
    const iterateeFunc = iteratee(predicate);
    if (isArray(collection)) {
        entries(collection).forEach(([key, value]) => iterateeFunc(value, Number(key), collection));
    } else if (isString(collection)) {
        entries(collection).forEach(([key, value]) => iterateeFunc(value, Number(key), collection));
    } else {
        entries(collection).forEach(([key, value]) => iterateeFunc(value, key, collection));
    }
    return collection;
}

export { forEach };

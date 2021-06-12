import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func = (...args: any[]) => any;
type PropertyName = string | number | symbol;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;

function forEach<T>(collection: T[], predicate?: ArrayIterator<T, unknown>): T[];
function forEach(collection: string, predicate?: StringIterator<unknown>): string;
function forEach<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, unknown>
): Record<K, V>;
function forEach(collection: any, predicate: Func = identity): any {
    const iterateeFunc = iteratee(predicate);
    entries(collection).forEach(([key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterateeFunc(value, key, collection);
    });
    return collection;
}

export { forEach };

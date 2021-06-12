import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type StringIterateeCustom<R> = StringIterator<R> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function map<T, R>(collection: T[], predicate?: ArrayIterateeCustom<T, R>): R[];
function map<R>(collection: string, predicate?: StringIterateeCustom<R>): R[];
function map<K extends PropertyName, V, R>(collection: Record<K, V>, predicate?: RecordIterateeCustom<K, V, R>): R[];
function map(collection: any, predicate: any = identity): any {
    const iterateeFunc = iteratee(predicate);
    return entries(collection).map(([key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterateeFunc(value, key, collection);
    });
}

export { map };

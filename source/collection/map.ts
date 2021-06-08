import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function map<T, TResult>(collection: T[], predicate?: ArrayIterator<T, TResult> | PropertyName): TResult[];
function map<TResult>(collection: string, predicate?: StringIterator<TResult> | PropertyName): TResult[];
function map<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, TResult> | PropertyName
): TResult[];
function map(collection: any, predicate: any = identity): any {
    const iterateeFunc = iteratee(predicate);
    if (isArray(collection)) {
        return entries(collection).map(([key, value]) => iterateeFunc(value, Number(key), collection));
    } else if (isString(collection)) {
        return entries(collection).map(([key, value]) => iterateeFunc(value, Number(key), collection));
    } else {
        return entries(collection).map(([key, value]) => iterateeFunc(value, key, collection));
    }
}

export { map };

import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func = (...args: any[]) => any;
type PropertyName = string | number | symbol;
type MemoArrayIterator<T, TResult> = (prev: TResult, curr: T, index: number, collection: T[]) => TResult;
type MemoStringIterator<TResult> = (prev: TResult, curr: string, index: number, collection: string) => TResult;
type MemoRecordIterator<K extends PropertyName, V, TResult> = (
    prev: TResult,
    curr: V,
    key: K,
    collection: Record<K, V>
) => TResult;

function reduce<T, TResult>(collection: T[], predicate?: MemoArrayIterator<T, TResult>, accumulator?: TResult): TResult;
function reduce<TResult>(collection: string, predicate?: MemoStringIterator<TResult>, accumulator?: TResult): TResult;
function reduce<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: MemoRecordIterator<K, V, TResult>,
    accumulator?: TResult
): TResult;
function reduce(collection: any, predicate: Func = identity, accumulator?: any): any {
    const iterateeFunc = iteratee(predicate);
    return entries(collection).reduce((prev, [key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterateeFunc(prev, value, key, collection);
    }, accumulator);
}

export { reduce };

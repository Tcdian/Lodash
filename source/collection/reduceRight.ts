import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type MemoArrayIterator<T, R> = (prev: R, curr: T, index: number, collection: T[]) => R;
type MemoStringIterator<R> = (prev: R, curr: string, index: number, collection: string) => R;
type MemoRecordIterator<K extends PropertyName, V, R> = (prev: R, curr: V, key: K, collection: Record<K, V>) => R;

function reduceRight<T, R>(collection: T[], predicate?: MemoArrayIterator<T, R>, accumulator?: R): R;
function reduceRight<R>(collection: string, predicate?: MemoStringIterator<R>, accumulator?: R): R;
function reduceRight<K extends PropertyName, V, R>(
    collection: Record<K, V>,
    predicate?: MemoRecordIterator<K, V, R>,
    accumulator?: R
): R;
function reduceRight(collection: any, predicate: Func<any[], any> = identity, accumulator?: any): any {
    const iterateeFunc = iteratee(predicate);
    return entries(collection).reduceRight((prev, [key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterateeFunc(prev, value, key, collection);
    }, accumulator);
}

export { reduceRight };

import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { isUndefined } from '../lang/isUndefined';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type StringIterateeCustom<TResult> = StringIterator<TResult> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;
type RecordIterateeCustom<K extends PropertyName, V, TResult> = RecordIterator<K, V, TResult> | IterateeShorthand<V>;

function findLast<T>(collection: T[], predicate?: ArrayIterateeCustom<T, boolean>, fromIndex?: number): T;
function findLast(collection: string, predicate?: StringIterateeCustom<boolean>, fromIndex?: number): string;
function findLast<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, boolean>,
    fromIndex?: number
): V;
function findLast(collection: any, predicate: any = identity, fromIndex?: number): any {
    const iterateeFunc = iteratee(predicate);
    const pairs = entries(collection);
    const len = pairs.length;
    if (isUndefined(fromIndex)) {
        fromIndex = len - 1;
    } else {
        if (fromIndex < 0) {
            fromIndex = Math.max(fromIndex + len, 0);
        } else {
            fromIndex = Math.min(fromIndex, len - 1);
        }
    }
    for (let i = fromIndex; i > 0; i--) {
        const pair = pairs[i];
        let [key, value]: [PropertyName, any] = pair;
        if (isArray(collection) || isString(collection)) {
            key = Number(key);
        }
        if (iterateeFunc(value, key, pair)) {
            return value;
        }
    }
}

export { findLast };

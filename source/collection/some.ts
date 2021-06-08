import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type StringIterateeCustom<TResult> = StringIterator<TResult> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;
type RecordIterateeCustom<K extends PropertyName, V, TResult> = RecordIterator<K, V, TResult> | IterateeShorthand<V>;

function some<T>(collection: T[], predicate?: ArrayIterateeCustom<T, boolean>): boolean;
function some(collection: string, predicate?: StringIterateeCustom<boolean>): boolean;
function some<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, boolean>
): boolean;
function some(collection: any, predicate: any = identity): boolean {
    const iterateeFunc = iteratee(predicate);
    return entries(collection).some(([key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterateeFunc(value, key, collection);
    });
}

export { some };

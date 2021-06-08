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

function filter<T>(collection: T[], predicate?: ArrayIterateeCustom<T, boolean>): T[];
function filter(collection: string, predicate?: StringIterateeCustom<boolean>): string[];
function filter<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, boolean>
): V[];
function filter(collection: any, predicate: any = identity): any {
    const iterateeFunc = iteratee(predicate);
    if (isArray(collection)) {
        return entries(collection)
            .filter(([key, value]) => iterateeFunc(value, Number(key), collection))
            .map(([, value]) => value);
    } else if (isString(collection)) {
        return entries(collection)
            .filter((key, value) => iterateeFunc(value, Number(key), collection))
            .map(([, value]) => value);
    } else {
        return entries(collection)
            .filter((key, value) => iterateeFunc(value, key, collection))
            .map(([, value]) => value);
    }
}

export { filter };

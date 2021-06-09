import { identity } from '../util/identity';
import { map } from './map';
import { flattenDeep } from '../array/flattenDeep';

type RecursiveArray<T> = (T | RecursiveArray<T>)[];
type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type StringIterateeCustom<TResult> = StringIterator<TResult> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;
type RecordIterateeCustom<K extends PropertyName, V, TResult> = RecordIterator<K, V, TResult> | IterateeShorthand<V>;

function flatMapDeep<T, TResult>(
    collection: T[],
    predicate?: ArrayIterateeCustom<T, RecursiveArray<TResult>>
): TResult[];
function flatMapDeep<TResult>(collection: string, predicate?: StringIterateeCustom<RecursiveArray<TResult>>): TResult[];
function flatMapDeep<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, RecursiveArray<TResult>>
): TResult[];
function flatMapDeep(collection: any, predicate: any = identity): any {
    return flattenDeep(map(collection, predicate));
}

export { flatMapDeep };

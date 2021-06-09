import { identity } from '../util/identity';
import { map } from './map';
import { flattenDepth } from '../array/flattenDepth';

type RecursiveArray<T> = (T | RecursiveArray<T>)[];
type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type StringIterateeCustom<TResult> = StringIterator<TResult> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;
type RecordIterateeCustom<K extends PropertyName, V, TResult> = RecordIterator<K, V, TResult> | IterateeShorthand<V>;

function flatMapDepth<T, TResult>(
    collection: T[],
    predicate?: ArrayIterateeCustom<T, RecursiveArray<TResult>>,
    depth?: number
): TResult[];
function flatMapDepth<TResult>(
    collection: string,
    predicate?: StringIterateeCustom<RecursiveArray<TResult>>,
    depth?: number
): TResult[];
function flatMapDepth<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, RecursiveArray<TResult>>,
    depth?: number
): TResult[];
function flatMapDepth(collection: any, predicate: any = identity, depth = 1): any {
    return flattenDepth(map(collection, predicate), depth);
}

export { flatMapDepth };

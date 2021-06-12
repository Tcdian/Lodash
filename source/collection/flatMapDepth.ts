import { identity } from '../util/identity';
import { map } from './map';
import { flattenDepth } from '../array/flattenDepth';

type RecursiveArray<T> = (T | RecursiveArray<T>)[];
type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type StringIterateeCustom<R> = StringIterator<R> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function flatMapDepth<T, R>(
    collection: T[],
    predicate?: ArrayIterateeCustom<T, RecursiveArray<R>>,
    depth?: number
): R[];
function flatMapDepth<R>(collection: string, predicate?: StringIterateeCustom<RecursiveArray<R>>, depth?: number): R[];
function flatMapDepth<K extends PropertyName, V, R>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, RecursiveArray<R>>,
    depth?: number
): R[];
function flatMapDepth(collection: any, predicate: any = identity, depth = 1): any {
    return flattenDepth(map(collection, predicate), depth);
}

export { flatMapDepth };

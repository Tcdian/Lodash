import { identity } from '../util/identity';
import { map } from './map';
import { flattenDepth } from '../array/flattenDepth';

type PropertyName = string | number | symbol;
type RecursiveArray<T> = (T | RecursiveArray<T>)[];
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function flatMapDepth<T, TResult>(
    collection: T[],
    predicate?: ArrayIterator<T, RecursiveArray<TResult>> | PropertyName,
    depth?: number
): TResult[];
function flatMapDepth<TResult>(
    collection: string,
    predicate?: StringIterator<RecursiveArray<TResult>> | PropertyName,
    depth?: number
): TResult[];
function flatMapDepth<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, RecursiveArray<TResult>> | PropertyName,
    depth?: number
): TResult[];
function flatMapDepth(collection: any, predicate: any = identity, depth = 1): any {
    return flattenDepth(map(collection, predicate), depth);
}

export { flatMapDepth };

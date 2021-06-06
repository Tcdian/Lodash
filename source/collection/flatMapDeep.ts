import { identity } from '../util/identity';
import { map } from './map';
import { flattenDeep } from '../array/flattenDeep';

type PropertyName = string | number | symbol;
type RecursiveArray<T> = (T | RecursiveArray<T>)[];
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function flatMapDeep<T, TResult>(
    collection: T[],
    predicate?: ArrayIterator<T, RecursiveArray<TResult>> | PropertyName
): TResult[];
function flatMapDeep<TResult>(
    collection: string,
    predicate?: StringIterator<RecursiveArray<TResult>> | PropertyName
): TResult[];
function flatMapDeep<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, RecursiveArray<TResult>> | PropertyName
): TResult[];
function flatMapDeep(collection: any, predicate: any = identity): any {
    return flattenDeep(map(collection, predicate));
}

export { flatMapDeep };

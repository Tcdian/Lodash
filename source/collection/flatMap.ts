import { identity } from '../util/identity';
import { map } from './map';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;

function flatMap<T, TResult>(
    collection: T[],
    predicate?: ArrayIterator<T, TResult | TResult[]> | PropertyName
): TResult[];
function flatMap<TResult>(
    collection: string,
    predicate?: StringIterator<TResult | TResult[]> | PropertyName
): TResult[];
function flatMap<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterator<K, V, TResult | TResult[]> | PropertyName
): TResult[];
function flatMap(collection: any, predicate: any = identity): any {
    return flatten(map(collection, predicate));
}

export { flatMap };

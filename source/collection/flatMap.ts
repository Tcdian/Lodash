import { identity } from '../util/identity';
import { map } from './map';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;
type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;
type StringIterateeCustom<TResult> = StringIterator<TResult> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, TResult> = (value: V, key: K, collection: Record<K, V>) => TResult;
type RecordIterateeCustom<K extends PropertyName, V, TResult> = RecordIterator<K, V, TResult> | IterateeShorthand<V>;

function flatMap<T, TResult>(collection: T[], predicate?: ArrayIterateeCustom<T, TResult | TResult[]>): TResult[];
function flatMap<TResult>(collection: string, predicate?: StringIterateeCustom<TResult | TResult[]>): TResult[];
function flatMap<K extends PropertyName, V, TResult>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, TResult | TResult[]>
): TResult[];
function flatMap(collection: any, predicate: any = identity): any {
    return flatten(map(collection, predicate));
}

export { flatMap };

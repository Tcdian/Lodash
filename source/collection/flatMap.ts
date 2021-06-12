import { identity } from '../util/identity';
import { map } from './map';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type StringIterateeCustom<R> = StringIterator<R> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function flatMap<T, R>(collection: T[], predicate?: ArrayIterateeCustom<T, R | R[]>): R[];
function flatMap<R>(collection: string, predicate?: StringIterateeCustom<R | R[]>): R[];
function flatMap<K extends PropertyName, V, R>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, R | R[]>
): R[];
function flatMap(collection: any, predicate: any = identity): any {
    return flatten(map(collection, predicate));
}

export { flatMap };

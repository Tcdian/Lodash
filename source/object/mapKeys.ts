import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function mapKeys<T, R extends PropertyName>(object: T[], predicate?: ArrayIterateeCustom<T, R>): Record<R, T>;
function mapKeys<K extends PropertyName, V, R extends PropertyName>(
    object: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, R>
): Record<R, V>;
function mapKeys(object: any, predicate: any = identity): Record<string, any> {
    const iterativeFunc = iteratee(predicate);
    const result: Record<string, any> = {};
    entries(object).forEach(([key, value]) => {
        result[iterativeFunc(value, key, object)] = value;
    });
    return result;
}

export { mapKeys };

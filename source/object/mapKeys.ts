import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function mapKeys<T, R extends string>(object: T[], predicate?: ArrayIterateeCustom<T, R>): Record<string, T>;
function mapKeys<K extends PropertyName, V, R extends string>(
    object: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, R>
): Record<string, V>;
function mapKeys(object: any, predicate: any = identity): Record<string, any> {
    const iterateeFunc = iteratee(predicate);
    const result: Record<string, any> = {};
    entries(object).forEach(([key, value]) => {
        result[iterateeFunc(value, key, object)] = value;
    });
    return result;
}

export { mapKeys };

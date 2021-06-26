import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function forOwn<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate: RecordIterateeCustom<K, V, unknown> = identity
): Record<K, V> {
    const iterativeFunc = iteratee(predicate);
    const pairs = entries(collection);
    const len = pairs.length;
    for (let i = 0; i < len; i++) {
        const [key, value]: [PropertyName, any] = pairs[i];
        if (iterativeFunc(value, key, collection) === false) {
            return collection;
        }
    }
    return collection;
}

export { forOwn };

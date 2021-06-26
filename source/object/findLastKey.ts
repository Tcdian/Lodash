import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from './entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function findLastKey<K extends PropertyName, V>(
    object: Record<K, V>,
    predicate: RecordIterateeCustom<K, V, unknown> = identity
): K | undefined {
    const iterativeFunc = iteratee(predicate);
    const pairs = entries(object);
    const len = pairs.length;
    for (let i = len - 1; i >= 0; i--) {
        const [key, value] = pairs[i];
        if (iterativeFunc(value, key, object)) {
            return key;
        }
    }
}

export { findLastKey };

import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entriesIn } from '../object/entriesIn';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function forInRight<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate: RecordIterateeCustom<K, V, unknown> = identity
): Record<K, V> {
    const iterateeFunc = iteratee(predicate);
    const pairs = entriesIn(collection);
    const len = pairs.length;
    for (let i = len - 1; i >= 0; i--) {
        const [key, value]: [PropertyName, any] = pairs[i];
        if (iterateeFunc(value, key, collection) === false) {
            return collection;
        }
    }
    return collection;
}

export { forInRight };

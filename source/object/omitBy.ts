import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueKeyIteratee<T, R> = (value: T, key: PropertyName) => R;
type ValueKeyIterateeCustom<T, R> = ValueKeyIteratee<T, R> | IterateeShorthand<T>;

function omitBy<K extends PropertyName, V>(
    object: Record<K, V>,
    predicate: ValueKeyIterateeCustom<V, unknown> = identity
): Partial<Record<K, V>> {
    // todo ..
}

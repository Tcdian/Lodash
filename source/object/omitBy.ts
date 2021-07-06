import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { negate } from '../function/negate';
import { pickBy } from './pickBy';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueKeyIteratee<T, R> = (value: T, key: PropertyName) => R;
type ValueKeyIterateeCustom<T, R> = ValueKeyIteratee<T, R> | IterateeShorthand<T>;

function omitBy<K extends PropertyName, V>(
    object: Record<K, V>,
    predicate: ValueKeyIterateeCustom<V, unknown> = identity
): Partial<Record<K, V>> {
    const iterativeFunc = iteratee(predicate);
    return pickBy(object, negate(iterativeFunc));
}

export { omitBy };

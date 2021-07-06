import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { _getAllKeysIn } from '../lang/_getAllKeysIn';
import { pick } from './pick';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueKeyIteratee<T, R> = (value: T, key: PropertyName) => R;
type ValueKeyIterateeCustom<T, R> = ValueKeyIteratee<T, R> | IterateeShorthand<T>;

function pickBy<K extends PropertyName, V>(
    object: Record<K, V>,
    predicate: ValueKeyIterateeCustom<V, unknown> = identity
): Partial<Record<K, V>> {
    const iterativeFunc = iteratee(predicate);
    const pickedKeys = _getAllKeysIn(object).filter((key) => iterativeFunc(object[key as K], key)) as K[];
    return pick(object, pickedKeys);
}

export { pickBy };

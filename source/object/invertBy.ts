import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function invertBy<K extends PropertyName, V>(
    object: Record<K, V>,
    predicate: ValueIterateeCustom<V, unknown> = identity
): Record<string, K[]> {
    const iterativeFunc = iteratee(predicate);
    const result: Record<string, K[]> = {};
    entries(object).forEach(([key, value]) => {
        const generated = iterativeFunc(value);
        if (Object.prototype.hasOwnProperty.call(result, generated)) {
            result[generated].push(key);
        } else {
            Object.assign(result, { [generated]: [key] });
        }
    });
    return result;
}

export { invertBy };

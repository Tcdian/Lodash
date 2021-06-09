import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';
import { assign } from '../object/assign';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function countBy<T, TResult extends PropertyName>(
    collection: T[],
    predicate?: ValueIterateeCustom<T, TResult>
): Record<TResult, number>;
function countBy<TResult extends PropertyName>(
    collection: string,
    predicate?: ValueIterateeCustom<string, TResult>
): Record<TResult, number>;
function countBy<K extends PropertyName, V, TResult extends PropertyName>(
    collection: Record<K, V>,
    predicate?: ValueIterateeCustom<V, TResult>
): Record<TResult, number>;
function countBy<TResult extends PropertyName>(
    collection: any,
    predicate: ValueIterateeCustom<any, TResult> = identity
): Record<TResult, number> {
    const result: Record<PropertyName, number> = {};
    const iterateeFunc = iteratee(predicate);
    values(collection).forEach((value) => {
        const generated = iterateeFunc(value);
        if (Object.prototype.hasOwnProperty.call(result, generated)) {
            result[generated] += 1;
        } else {
            assign(result, { [generated]: 1 });
        }
    });
    return result;
}

export { countBy };

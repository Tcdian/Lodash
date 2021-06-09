import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';
import { assign } from '../object/assign';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function groupBy<T, TResult extends PropertyName>(
    collection: T[],
    predicate?: ValueIterateeCustom<T, TResult>
): Record<TResult, T[]>;
function groupBy<TResult extends PropertyName>(
    collection: string,
    predicate?: ValueIterateeCustom<string, TResult>
): Record<TResult, string[]>;
function groupBy<K extends PropertyName, V, TResult extends PropertyName>(
    collection: Record<K, V>,
    predicate?: ValueIterateeCustom<V, TResult>
): Record<TResult, V>;
function groupBy<TResult extends PropertyName>(
    collection: any,
    predicate: ValueIterateeCustom<any, TResult> = identity
): Record<TResult, any> {
    const result: Record<PropertyName, any> = {};
    const iterateeFunc = iteratee(predicate);
    values(collection).forEach((value) => {
        const generated = iterateeFunc(value);
        if (Object.prototype.hasOwnProperty.call(result, generated)) {
            result[generated].push(value);
        } else {
            assign(result, { [generated]: [value] });
        }
    });
    return result;
}

export { groupBy };

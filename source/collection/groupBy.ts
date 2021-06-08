import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIteratee<T, TResult> = ((value: T) => TResult) | IterateeShorthand<T>;

function groupBy<T, TResult extends PropertyName>(
    collection: T[],
    predicate?: ValueIteratee<T, TResult>
): Record<TResult, T[]>;
function groupBy<TResult extends PropertyName>(
    collection: string,
    predicate?: ValueIteratee<string, TResult>
): Record<TResult, string[]>;
function groupBy<K extends PropertyName, V, TResult extends PropertyName>(
    collection: Record<K, V>,
    predicate?: ValueIteratee<V, TResult>
): Record<TResult, V>;
function groupBy<TResult extends PropertyName>(
    collection: any,
    predicate: ValueIteratee<any, TResult> = identity
): Record<TResult, any> {
    const result: Record<PropertyName, any> = {};
    const iterateeFunc = iteratee(predicate);
    entries(collection).forEach(([, value]) => {
        const generated = iterateeFunc(value);
        if (Object.prototype.hasOwnProperty.call(result, generated)) {
            result[generated].push(value);
        } else {
            Object.assign(result, { [generated]: [value] });
        }
    });
    return result;
}

export { groupBy };

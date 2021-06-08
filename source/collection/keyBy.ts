import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterateeCustom<T, TResult> = ((value: T) => TResult) | IterateeShorthand<T>;

function keyBy<T, TResult extends PropertyName>(
    collection: T[],
    predicate: ValueIterateeCustom<T, TResult>
): Record<TResult, T>;
function keyBy<TResult extends PropertyName>(
    collection: string,
    predicate: ValueIterateeCustom<string, TResult>
): Record<TResult, string>;
function keyBy<K extends PropertyName, V, TResult extends PropertyName>(
    collection: Record<K, V>,
    predicate: ValueIterateeCustom<V, TResult>
): Record<TResult, V>;
function keyBy<TResult extends PropertyName>(
    collection: any,
    predicate: ValueIterateeCustom<any, TResult> = identity
): Record<TResult, any> {
    const result: Record<PropertyName, any> = {};
    const iterateeFunc = iteratee(predicate);
    values(collection).forEach((value) => {
        const generated = iterateeFunc(value);
        Object.assign(result, { [generated]: value });
    });
    return result;
}

export { keyBy };

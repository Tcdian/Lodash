import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function keyBy<T, R extends PropertyName>(collection: T[], predicate?: ValueIterateeCustom<T, R>): Record<R, T>;
function keyBy<R extends PropertyName>(
    collection: string,
    predicate?: ValueIterateeCustom<string, R>
): Record<R, string>;
function keyBy<K extends PropertyName, V, R extends PropertyName>(
    collection: Record<K, V>,
    predicate?: ValueIterateeCustom<V, R>
): Record<R, V>;
function keyBy<R extends PropertyName>(
    collection: any,
    predicate: ValueIterateeCustom<any, R> = identity
): Record<R, any> {
    const iterateeFunc = iteratee(predicate);
    const result: Record<PropertyName, any> = {};
    values(collection).forEach((value) => {
        const generated = iterateeFunc(value);
        Object.assign(result, { [generated]: value });
    });
    return result;
}

export { keyBy };

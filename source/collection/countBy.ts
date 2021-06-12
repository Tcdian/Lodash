import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';
import { assign } from '../object/assign';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function countBy<T, R extends PropertyName>(collection: T[], predicate?: ValueIterateeCustom<T, R>): Record<R, number>;
function countBy<R extends PropertyName>(
    collection: string,
    predicate?: ValueIterateeCustom<string, R>
): Record<R, number>;
function countBy<K extends PropertyName, V, R extends PropertyName>(
    collection: Record<K, V>,
    predicate?: ValueIterateeCustom<V, R>
): Record<R, number>;
function countBy<R extends PropertyName>(
    collection: any,
    predicate: ValueIterateeCustom<any, R> = identity
): Record<R, number> {
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

import { map } from './map';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;
type Many<T> = T | T[];
type Func<TS extends any[], R> = (...args: TS) => R;

function sortBy<T>(collection: T[], iteratees: Many<ValueIterateeCustom<T, unknown>>): T[];
function sortBy<K extends PropertyName, V>(
    collection: Record<K, V>,
    iteratees: Many<ValueIterateeCustom<V, unknown>>
): V[];
function sortBy(collection: any, iteratees: Many<ValueIterateeCustom<any, unknown>>): any[] {
    if (!isArray(iteratees)) {
        iteratees = [iteratees];
    }
    const iterativeFuncs: Func<any[], any>[] = iteratees.map((it: ValueIterateeCustom<any, unknown>) => iteratee(it));
    let index = -1;
    const wrapped = map(collection, (value) => {
        return {
            value: value,
            index: ++index,
            criteria: iterativeFuncs.map((iterativeFunc) => iterativeFunc(value)),
        };
    });
    return wrapped
        .sort((wrappedVal, wrappedOth) => {
            const valCriteria = wrappedVal.criteria;
            const othCriteria = wrappedOth.criteria;
            const len = valCriteria.length;
            let index = -1;
            while (++index < len) {
                if (valCriteria[index] !== othCriteria[index]) {
                    return valCriteria[index] < othCriteria[index] ? -1 : 1;
                }
            }
            return wrappedVal.index - wrappedOth.index;
        })
        .map(({ value }) => value);
}

export { sortBy };

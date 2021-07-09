import { map } from './map';
import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function orderBy<T>(collection: T[], iteratees?: ValueIterateeCustom<T, unknown>[], orders?: ('asc' | 'desc')[]): T[];
function orderBy<K extends PropertyName, V>(
    collection: Record<K, V>,
    iteratees?: ValueIterateeCustom<V, unknown>[],
    orders?: ('asc' | 'desc')[]
): V[];
function orderBy(
    collection: any,
    iteratees: ValueIterateeCustom<any, unknown>[] = [identity],
    orders: ('asc' | 'desc')[] = []
): any[] {
    const iterativeFuncs = iteratees.map((it) => iteratee(it));
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
                    const cmpResult = valCriteria[index] < othCriteria[index] ? -1 : 1;
                    return cmpResult * (orders[index] === 'desc' ? -1 : 1);
                }
            }
            return wrappedVal.index - wrappedOth.index;
        })
        .map(({ value }) => value);
}

export { orderBy };

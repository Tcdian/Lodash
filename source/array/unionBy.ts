import { union } from './union';
import { uniqBy } from './uniqBy';
import { flatten } from './flatten';
import { isArrayLikeObject } from '../lang/isArrayLikeObject';
import { last } from '../array/last';
import { initial } from '../array/initial';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function unionBy<T>(array: T[], other: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function unionBy<T>(array: T[], other1: T[], other2: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function unionBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[];
function unionBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[] {
    const predicate = last(args);
    if (isArrayLikeObject(predicate)) {
        return union(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    return uniqBy(flatten(arrays), predicate);
}

export { unionBy };

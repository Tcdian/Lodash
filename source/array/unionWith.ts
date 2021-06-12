import { uniqWith } from './uniqWith';
import { union } from './union';
import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { flatten } from './flatten';

type Comparator<T1, T2> = (a: T1, b: T2) => boolean;

function unionWith<T>(array: T[], other: T[], comparator: Comparator<T, T>): T[];
function unionWith<T>(array: T[], other1: T[], other2: T[], comparator: Comparator<T, T>): T[];
function unionWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[];
function unionWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[] {
    const comparator = last(args);
    if (!isFunction(comparator)) {
        return union(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    return uniqWith(flatten(arrays), comparator);
}

export { unionWith };

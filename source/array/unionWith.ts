import { uniqWith } from './uniqWith';
import { union } from './union';
import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { flatten } from './flatten';

type Comparator<T> = (a: T, b: T) => boolean;

function unionWith<T>(array: T[], other: T[], comparator: Comparator<T>): T[];
function unionWith<T>(array: T[], other1: T[], other2: T[], comparator: Comparator<T>): T[];
function unionWith<T>(array: T[], other1: T[], other2: T[], other3: T[], comparator: Comparator<T>): T[];
function unionWith<T>(array: T[], other1: T[], other2: T[], other3: T[], other4: T[], comparator: Comparator<T>): T[];
function unionWith<T>(
    array: T[],
    other1: T[],
    other2: T[],
    other3: T[],
    other4: T[],
    other5: T[],
    comparator: Comparator<T>
): T[];
function unionWith<T>(...args: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(args);
    if (!isFunction(comparator)) {
        return union(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    return uniqWith(flatten<T>(arrays), comparator);
}

export { unionWith };

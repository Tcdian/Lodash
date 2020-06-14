import uniqWith from './uniqWith';
import union from './union';
import last from './last';
import initial from './initial';
import isArray from './isArray';
import flatten from './flatten';

type Comparator<T> = (a: T, b: T) => boolean;

function unionWith<T>(...args: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(args);
    if (isArray(comparator)) {
        return union(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    return uniqWith(flatten<T>(arrays), comparator);
}

export default unionWith;

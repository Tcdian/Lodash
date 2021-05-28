import { xor } from './xor';
import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { uniqWith } from './uniqWith';
import { flatten } from './flatten';

type Comparator<T> = (a: T, b: T) => boolean;

function xorWith<T>(arrays: T[], comparator: Comparator<T>): T[];
function xorWith<T>(arrays1: T[], arrays2: T[], comparator: Comparator<T>): T[];
function xorWith<T>(arrays1: T[], arrays2: T[], arrays3: T[], comparator: Comparator<T>): T[];
function xorWith<T>(arrays1: T[], arrays2: T[], arrays3: T[], arrays4: T[], comparator: Comparator<T>): T[];
function xorWith<T>(
    arrays1: T[],
    arrays2: T[],
    arrays3: T[],
    arrays4: T[],
    arrays5: T[],
    comparator: Comparator<T>
): T[];
function xorWith<T>(...args: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(args);
    if (!isFunction(comparator)) {
        return xor(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    const uniqedArrays = arrays.map((array) => uniqWith(array, comparator));
    const flattened = flatten<T>(uniqedArrays);
    return flattened.filter(
        (arrVal, arrIndex, collection) =>
            !collection.find((othVal, othIndex) => arrIndex !== othIndex && comparator(arrVal, othVal))
    );
}

export { xorWith };

import { flattenDepth } from './flattenDepth';

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

function flattenDeep<T>(array: RecursiveArray<T>): T[] {
    return flattenDepth(array, Infinity) as T[];
}

export { flattenDeep };

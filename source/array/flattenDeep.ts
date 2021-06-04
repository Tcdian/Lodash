import { flattenDepth } from './flattenDepth';

type RecursiveArray<T> = (T | RecursiveArray<T>)[];

function flattenDeep<T>(array: RecursiveArray<T>): T[] {
    return flattenDepth(array, Infinity);
}

export { flattenDeep };

import flattenDepth from './flattenDepth';

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

function flatten<T>(array: RecursiveArray<T>): T[] {
    return flattenDepth(array) as T[];
}

export default flatten;

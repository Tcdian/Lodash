import { flattenDepth } from './flattenDepth';

function flatten<T>(array: (T | T[])[]): T[] {
    return flattenDepth(array, 1);
}

export { flatten };

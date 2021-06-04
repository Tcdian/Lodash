import { flattenDepth } from './flattenDepth';

function flatten<T>(array: (T | T[])[]): T[] {
    return flattenDepth(array);
}

export { flatten };

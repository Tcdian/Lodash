import { isArray } from '../lang/isArray';

type RecursiveArray<T> = (T | RecursiveArray<T>)[];

function flattenDepth<T>(array: RecursiveArray<T>, depth = 1): T[] {
    let result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        if (depth > 0 && isArray(array[i])) {
            result = [...result, ...flattenDepth(array[i] as RecursiveArray<T>, depth - 1)];
        } else {
            result = [...result, array[i] as T];
        }
    }
    return result;
}

export { flattenDepth };

import { flatten } from './flatten';

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

function concat<T>(array: T[], ...values: RecursiveArray<T>): T[] {
    const flattened = flatten<T>(values);
    return [...array, ...flattened];
}

export { concat };

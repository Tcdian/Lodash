import { flatten } from './flatten';

function concat<T>(array: T[], ...values: (T | T[])[]): T[] {
    const flattened = flatten(values);
    return [...array, ...flattened];
}

export { concat };

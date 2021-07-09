import { flatten } from './flatten';

function difference<T>(array: T[], ...values: T[][]): T[] {
    return array.filter((arrVal) => !flatten(values).some((othVal) => Object.is(arrVal, othVal)));
}

export { difference };

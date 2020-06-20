import flatten from './flatten';

function difference<T>(array: T[], ...values: T[][]): T[] {
    const exitSet = new Set(flatten<T>(values));
    return array.filter((arrVal) => !exitSet.has(arrVal));
}

export default difference;

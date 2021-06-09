import { sortedLastIndexBy } from './sortedLastIndexBy';

function sortedLastIndex<T>(array: T[], value: T): number {
    return sortedLastIndexBy(array, value);
}

export { sortedLastIndex };

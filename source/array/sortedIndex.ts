import { sortedIndexBy } from './sortedIndexBy';

function sortedIndex<T>(array: T[], value: T): number {
    return sortedIndexBy(array, value);
}

export { sortedIndex };

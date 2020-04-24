import sortedIndex from './sortedIndex';

function sortedIndexOf<T>(array: T[], value: T): number {
    const index = sortedIndex(array, value);
    return array[index] === value ? index : -1;
}

export default sortedIndexOf;

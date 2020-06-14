import sortedLastIndex from './sortedLastIndex';

function sortedLastIndexOf<T>(array: T[], value: T): number {
    const index = sortedLastIndex(array, value) - 1;
    return array[index] === value ? index : -1;
}

export default sortedLastIndexOf;

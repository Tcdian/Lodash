function sortedUniq<T>(array: T[]): T[] {
    return array.filter((value, index, collection) => index === 0 || collection[index - 1] !== value);
}

export { sortedUniq };

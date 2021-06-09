function sortedLastIndex<T>(array: T[], value: T): number {
    if (value < array[0]) {
        return 0;
    }
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (array[mid] > value) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }
    return left + 1;
}

export { sortedLastIndex };

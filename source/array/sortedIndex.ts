function sortedIndex<T>(array: T[], value: T): number {
    const len = array.length;
    if (value > array[len - 1]) {
        return len;
    }

    let left = 0;
    let right = len - 1;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (array[mid] < value) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

export { sortedIndex };

function sortedIndex<T>(array: T[], value: T): number {
    const len = array.length;
    if (value > array[len - 1]) {
        return len;
    }

    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] < value) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

export default sortedIndex;

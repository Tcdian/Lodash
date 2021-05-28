function lastIndexOf<T>(array: T[], value: T, fromIndex = array.length - 1): number {
    return array.lastIndexOf(value, fromIndex);
}

export { lastIndexOf };

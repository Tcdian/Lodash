function slice<T>(array: T[], start = 0, end = array.length): T[] {
    return array.slice(start, end);
}

export { slice };

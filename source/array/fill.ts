function fill<T>(array: T[], value: T, start: number = 0, end: number = array.length): T[] {
    return array.fill(value, start, end);
}

export { fill };

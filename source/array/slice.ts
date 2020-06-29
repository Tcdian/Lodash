function slice<T>(array: T[], start: number = 0, end: number = array.length): T[] {
    return array.slice(start, end);
}

export { slice };

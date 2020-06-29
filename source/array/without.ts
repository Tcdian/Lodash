function without<T>(array: T[], ...values: T[]): T[] {
    const cache = new Set(values);
    return array.filter((value) => !cache.has(value));
}

export { without };

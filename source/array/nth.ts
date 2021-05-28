function nth<T>(array: T[], n = 0): T | undefined {
    const len = array.length;
    return array[(n + len) % len];
}

export { nth };

function take<T>(array: T[], n: number = 1): T[] {
    return array.slice(0, n > 0 ? n : 0);
}

export { take };

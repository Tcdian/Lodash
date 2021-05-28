function drop<T>(array: T[], n = 1): T[] {
    return array.slice(n);
}

export { drop };

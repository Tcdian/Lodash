function dropRight<T>(array: T[], n = 1): T[] {
    const len = array.length;
    return array.slice(0, len - n > 0 ? len - n : 0);
}

export { dropRight };

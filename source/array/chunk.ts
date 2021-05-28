function chunk<T>(array: T[], size = 1): T[][] {
    if (size < 1) {
        return [];
    }
    let result: T[][] = [];
    let i = 0;
    const len = array.length;
    while (i < len) {
        result = [...result, array.slice(i, (i += size))];
    }
    return result;
}

export { chunk };

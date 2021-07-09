function chunk<T>(array: T[], size = 1): T[][] {
    if (size < 1) {
        return [];
    }
    let result: T[][] = [];
    let index = 0;
    const len = array.length;
    while (index < len) {
        result = [...result, array.slice(index, (index += size))];
    }
    return result;
}

export { chunk };

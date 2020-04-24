function pullAt<T>(array: T[], indexes: number[]): T[] {
    const result: T[] = [];
    for (let i = indexes.length - 1; i >= 0; i--) {
        if (indexes[i] < array.length) {
            result.unshift(...array.splice(indexes[i], 1));
        }
    }
    return result;
}

export default pullAt;

function takeRight<T>(array: T[], n: number = 1): T[] {
    return array.slice(array.length - n >= 0 ? array.length - n : 0);
}

export default takeRight;

function dropRight<T>(array: T[], n: number = 1): T[] {
    const len = array.length;
    return array.slice(0, len - n > 0 ? len - n : 0);
}

export default dropRight;

function take<T>(array: T[], n: number = 1): T[] {
    return array.slice(0, n);
}

export default take;

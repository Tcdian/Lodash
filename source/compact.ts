function compact<T>(array: (T | null | undefined | false | '' | 0)[]): T[] {
    return array.filter((value) => !!value) as T[];
}

export default compact;

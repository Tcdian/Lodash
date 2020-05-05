interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function entries<T>(object: Dictionary<T> | NumericDictionary<T>): [string, T][] {
    return Object.entries(object);
}

export default entries;

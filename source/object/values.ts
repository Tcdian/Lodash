interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function values<T = any>(object: T[] | Dictionary<T> | NumericDictionary<T>): T[] {
    return Object.values(object);
}

export { values };

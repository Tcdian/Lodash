interface Dictionary<T> {
    [index: string]: T;
}

function invert(object: Dictionary<string | number>): Dictionary<string> {
    const pairs = Object.entries(object);
    return Object.fromEntries(pairs.map(([key, val]) => [val, key]));
}

export { invert };

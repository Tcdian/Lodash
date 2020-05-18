interface Dictionary<T> {
    [index: string]: T;
}

function invert(object: Dictionary<string | number>): Dictionary<string> {
    const keys = Object.keys(object);
    const result: Dictionary<string> = {};
    for (let i = 0; i < keys.length; i++) {
        result[object[keys[i]]] = keys[i];
    }
    return result;
}

export default invert;

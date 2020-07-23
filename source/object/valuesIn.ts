interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function valuesIn<T extends object>(object: T): T[keyof T][];
function valuesIn<T = any>(object: T[] | Dictionary<T> | NumericDictionary<T>): T[];
function valuesIn<T extends object>(object: T): T[keyof T][] {
    let result: T[keyof T][] = [];
    for (let key in object) {
        result.push(object[key]);
    }
    return result;
}

export { valuesIn };

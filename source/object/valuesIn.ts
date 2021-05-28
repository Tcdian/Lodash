type PropertyName = string | number | symbol;

function valuesIn<T>(object: T[] | Record<PropertyName, T>): T[] {
    const result: T[] = [];
    for (const key in object) {
        result.push(object[key]);
    }
    return result;
}

export { valuesIn };

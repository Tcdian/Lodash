type PropertyName = string | number | symbol;

function values<T>(object: Record<PropertyName, T> | T[]): T[] {
    return Object.values(object);
}

export { values };

type PropertyName = string | number | symbol;

function values<T>(object: T[] | Record<PropertyName, T>): T[] {
    return Object.values(object);
}

export { values };

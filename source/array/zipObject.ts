type PropertyName = string | number | symbol;

function zipObject<T>(props: PropertyName[] = [], values: T[] = []): Record<PropertyName, T> {
    const result: Record<PropertyName, T> = {};
    props.forEach((prop, index) => {
        Object.assign(result, { [prop]: values[index] });
    });
    return result;
}

export { zipObject };

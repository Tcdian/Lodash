interface Dictionary<T> {
    [index: string]: T;
}

type PropertyName = string | number | symbol;

function zipObject<T>(props: PropertyName[] = [], values: T[] = []): Dictionary<T> {
    const result: Dictionary<T> = {};
    props.forEach((prop, index) => {
        Object.assign(result, { [prop]: values[index] });
    });
    return result;
}

export { zipObject };

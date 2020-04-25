interface Dictionary<T> {
    [propertyKey: string]: T;
}

type PropertyName = string | number | symbol;

function zipObject<T>(props: PropertyName[] = [], values: T[] = []): Dictionary<T> {
    const result: Dictionary<T> = {};
    for (let i = 0; i < props.length; i++) {
        Object.assign(result, { [props[i]]: values[i] });
    }
    return result;
}

export default zipObject;

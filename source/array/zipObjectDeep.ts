import { set } from '../object/set';

interface Dictionary<T> {
    [index: string]: T;
}

type PropertyName = string | number | symbol;

function zipObjectDeep<T>(props: PropertyName[] = [], values: T[] = []): Dictionary<T> {
    const result: Dictionary<T> = {};
    props.forEach((prop, index) => {
        set(result, prop, values[index]);
    });
    return result;
}

export { zipObjectDeep };

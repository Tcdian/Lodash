import { set } from '../object/set';

type PropertyName = string | number | symbol;

function zipObjectDeep<T>(props: PropertyName[] = [], values: T[] = []): Record<PropertyName, T> {
    const result: Record<PropertyName, T> = {};
    props.forEach((prop, index) => {
        set(result, prop, values[index]);
    });
    return result;
}

export { zipObjectDeep };

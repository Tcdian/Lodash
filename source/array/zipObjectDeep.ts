import { set } from '../object/set';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function zipObjectDeep(props: Many<PropertyName>[] = [], values: any[] = []): Record<PropertyName, any> {
    const result: Record<PropertyName, any> = {};
    props.forEach((prop, index) => {
        set(result, prop, values[index]);
    });
    return result;
}

export { zipObjectDeep };

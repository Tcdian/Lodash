import { setWith } from './setWith';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function set(object: any, path: Many<PropertyName>, value: any): any {
    return setWith(object, path, value);
}

export { set };

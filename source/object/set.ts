import { setWith } from './setWith';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function set(object: any, path: PropertyPath, value: any): any {
    return setWith(object, path, value);
}

export { set };

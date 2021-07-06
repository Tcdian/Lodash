import { get } from '../object/get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function property<T, R>(path: PropertyPath) {
    return function (object: T): R {
        return get(object, path);
    };
}

export { property };

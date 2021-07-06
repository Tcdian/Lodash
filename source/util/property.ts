import { get } from '../object/get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function property<T, R>(path: Many<PropertyName>) {
    return function (object: T): R {
        return get(object, path);
    };
}

export { property };

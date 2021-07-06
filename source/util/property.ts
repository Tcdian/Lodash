import { get } from '../object/get';

type Many<T> = T | T[];

function property<T, R>(path: Many<keyof T>) {
    return function (object: T): R {
        return get(object, path);
    };
}

export { property };

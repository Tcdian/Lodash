import { get } from '../object/get';

type Many<T> = T | T[];

function propertyOf<T, R>(object: T) {
    return function (path: Many<keyof T>): R {
        return get(object, path);
    };
}

export { propertyOf };

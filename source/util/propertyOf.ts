import { get } from '../object/get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function propertyOf<T, R>(object: T) {
    return function (path: Many<PropertyName>): R {
        return get(object, path);
    };
}

export { propertyOf };

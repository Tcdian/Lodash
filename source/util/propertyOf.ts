import { get } from '../object/get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function propertyOf<T, R>(object: T) {
    return function (path: PropertyPath): R {
        return get(object, path);
    };
}

export { propertyOf };

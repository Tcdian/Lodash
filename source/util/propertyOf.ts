import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function propertyOf<TObj, R>(object: TObj): (path: PropertyPath) => R {
    return function (path: PropertyPath): R {
        return get(object, path);
    };
}

export { propertyOf };

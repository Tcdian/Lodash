import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function propertyOf<T extends object, TResult>(object: T): (path: PropertyPath) => TResult {
    return function (this: any, path: PropertyPath): TResult {
        return get(object, path);
    };
}

export { propertyOf };

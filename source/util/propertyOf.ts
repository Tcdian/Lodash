import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function propertyOf<TObj, TResult>(object: TObj): (path: PropertyPath) => TResult {
    return function (path: PropertyPath): TResult {
        return get(object, path);
    };
}

export { propertyOf };
